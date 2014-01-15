I thought for my first blog post, I'd introduce a topic that's not super well known: dynamic time warping, or DTW.

## <a name='timeseries'></a> Time Series

Before getting into DTW, it's best to understand what exactly a time series is.

A time series is, as the name implies, a series of measurements taken over a period of time, sampled at a uniform interval. Examples of time series data include the value of stocks, EEG data and heart rates, and human body movement.

## <a name='background'></a> DTW Background

DTW is a an algorithm used to compare time series data to each other and operates similarly to Euclidean distance. The inputs are two vectors of numbers and the output is a distance, or similarity, score. Let's run through some examples of Euclidean distance first.

Recall that the formula for Euclidean distance is:
<p>
\[
    Euclidean(\vec{v}, \vec{w}) = \sqrt{\sum_{i = 1}^{n}(\vec{v}_i - \vec{w}_i)^2}
\]
</p>
This would mean that the distances between the vectors $[0, 0]$ and $[1, 1]$ is $\sqrt{(0 - 1)^2 + (0 - 1)^2} = \sqrt{2}$. 

In order for us to use Euclidean distance to compare vectors, the vectors first have to be of the same length. For example, we can't find the Euclidean distance between $[0, 0, 0]$ and $[1, 1, 1, 1]$.

The cool thing about Euclidean distance is that we can use it to figure out how similar vectors are to each other. If we find the Euclidean distance between a vector and itself, we will always get 0, implying that the closest a vector can be to another vector is 0 "distance", which means they are both the same vector. As the Euclidean distance between the vectors, their similarity decreases.

DTW distance also measures the similarity between two vectors, but with some significant advantages over Euclidean distance:

* The time series do not have to be the same length and the difference in length will be taken into account in the score
* The time series can be shifted and still result in a similar score. DTW has some phase-invariance built into it, making similarity measurements a bit more meaningful.
* DTW can help mitigate the effect of noise in data. We'll see this again in more detail later
* The DTW distance will never overestimate, or, $DTW(\vec{v}, \vec{w}) \leq Euclidean(\vec{v}, \vec{w})$.
* It is a more general form of Euclidean distance, so with some tweaking, we can always fall back to Euclidean distance if necessary.

## <a name='whatidtw'></a> How does DTW work?

When we have a time series vector, say $v = [1,2,3,4]$, and want to compare it into the vector $w= [2,3,4,5]$, DTW effectively finds the minimum cost series of operations to transform $v$ into $w$, where these operations are *substitution*, *insertion*, and *deletion*.

When we perform one of these operations, we incur a cost, typicaly defined by a *cost function*. Popular cost functions include the squared difference, or the absolute value difference. For example, substituting a $1$ for a $3$ would cost $(3 - 1)^2 = 4$ with the squared difference cost function. After we perform a series of operations, we accumulate costs, and DTW aims to minimize the sum of all these costs. The final cost is distance, or similarity score.

To see how DTW works, imagine we're traveling along both vectors from left to right simultaneously. We can either advance in $v$, or $w$, or both, all for a cost. In the following grid, $v$ is on the top row and $w$ is on the left column. Our cost function is the squared difference function and let the $\*$s denote our current positions.

In this grid, _moving right is a deletion, moving down is an insertion_, and _moving diagonally down-right is a substitution_. We can envision the series of these three operations as a "path" from the top left corner to the bottom right. Thus, DTW finds the minimum cost path in the grid from the top-left to the bottom right.
<p>
\[
    \begin{array}{c | c | c | c | c |}
       & *1  &  2  &  3 &  4  \\ \hline
    *2 &     &     &    &     \\ \hline
     3 &     &     &    &     \\ \hline
     4 &     &     &    &     \\ \hline
     5 &     &     &    &     \\ \hline
    \end{array}
\]
</p>

Here is the final path DTW finds for this example. The numbers represent the *cumulative cost*, or the total cost up to that point. The final cost of the entire path is is in the bottom right of the grid.
<p>
\[
    \begin{array}{c | c | c | c | c |}
       &  1  &  2  &  3 & *4  \\ \hline
     2 &  1  &  1  &    &     \\ \hline
     3 &     &     &  1 &     \\ \hline
     4 &     &     &    &  1  \\ \hline
    *5 &     &     &    &  2  \\ \hline
    \end{array}
\]
</p>

The total cost of the operations we took is $2$. This is the final DTW distance.

## <a name='implementation'></a> Implementation

The approach for implementing this algorithm draws from the grid we drew earlier. DTW minizes the *total* cost of all these operations. What that means in terms of the grid is that it finds the least cost path from one corner of the grid to the other. 

Starting at the top left corner of the grid, we can try different operations to transform the vector, with our goal being the bottom right corner. By keeping track of the cumulative cost of a series of transformations and minizing that quantity, we can use dynamic programming to implement this algorithm.

```python
def cost(x, y):
    return (x - y)**2

def dtw(v, w):
    n, m = len(v), len(w)
    arr = np.zeros((m + 1, n + 1))
    arr[0:m+1, 0] = float('inf')
    arr[0, 0:n+1] = float('inf')
    arr[1, 1] = cost(v[0], w[0])

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if i == 1 and j == 1:
                continue
            arr[i, j] = cost(v[j - 1], w[i - 1])  # local cost
                        + np.min([
                            arr[i-1,j-1], # substitution
                            arr[i,j-1], # deletion
                            arr[i-1,j] # insertion
                        ])
    return arr[-1][-1]
```

This Python implementation uses `numpy` because of convenient functions like `np.zeros`, etc. I'll probably stick with `numpy` in the future.

Let me explain it really quickly. We start in the top left of the grid and iterate through it. At every position in the grid, we calculate the cumulative cost of the *best path* to that point. This we do by calculating the local cost of that position and add it to the best path of the three possible ways to reach that position (insertion, deletion, and substitution), which is effectively the `min` of the three grid positions to the top, left, and top-left (which we should have already calculated). We continue this until we reach the bottom right, and we're done!

Notice the `cost` function, which represents the cost of an operation. In this example, I've just implemented the squared difference. Also, notice the use of infinity; to make the implementation a bit simpler, I padded the grid with infinities. 

Some quick runtime analysis: we have to loop through the entire grid and perform an $O(1)$ operation in each location. Thus, our total runtime is in $O(nm)$.

## <a name='implications'></a> Implications

If the DTW path is just a diagonal line from the top-left to the bottom-right, we actually get Euclidean distance. Any deviations from a diagonal line are just modifications on the Euclidean distance. This implies that DTW finds an alignment of the two time series that results in the least distance.
