I thought for my first blog post, I'd introduce a topic that's not super well known: dynamic time warping, or DTW.

## <a name='timeseries'></a> Time Series

Before getting into DTW, it's best to understand what exactly a time series is.

A time series is, as the name implies, a series of measurements taken over a period of time, sampled at a uniform interval. Examples of time series data include the value of stocks, EEG data and heart rates, and human body movement.

## <a name='background'></a> DTW Background

DTW is an algorithm used to compare time series data to each other and operates similarly to Euclidean distance. The inputs are two vectors of numbers and the output is a distance, or similarity, score. Let's run through some examples of Euclidean distance first.

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

## <a name='whatisdtw'></a> How does DTW work?

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

<center>
<table>
    <tr>
    <td><img src="/img/euclid-alignment.png" width="200" height="auto"></td>
    <td><img src="/img/dtw-alignment.png" width="200" height="auto"></td>
    </tr>
    <tr>
    <td>Euclidean alignment</td>
    <td>DTW alignment</td>
    </tr>
</table>
</center>
If similar events happen in the two time series, but one event just happens slightly later, the DTW will return a lower score than Euclidean distance, since it aligns similar patterns together.

> *Note:* Typically, paths are constrained in that they are not allowed to deviate too far from the Euclidean path. This prevents overalignment of the two time series. 

## <a name='enterdna'></a> Enter DNA as a time series

Now, a quick application of DTW. Let's say I extract part of someone's DNA and want to find the closest match to the sequence I've extracted in the human genome. The first step is to frame this as a time series problem. DNA consists of 4 base pairs, A, T, G, and C. We can't exactly use DTW on this sort of data, so we want to convert it to a time series of sorts. Using the method from one of [Prof. Eamonn Keogh's papers](http://www.cs.ucr.edu/~eamonn/SIGKDD_trillion.pdf), we can convert a DNA to a time series. We start at 0. Everytime we see a G, we go up by 1. Everytime we see a A, we go up by 2, a C, down by 1, and a T, down by 2.

Here's an example sequence of length 50 sequence `ATTCCTTGAGGCCTAAATGCATCGGGGTGCTCTGGTTTTGTTGTTGTT`.
<center><img src="/img/dna_50_ts.png" alt="DNA time series" style="width: 500px;"/></center>

Now, supposing I've extracted a sequence of 25 base pairs and I want to find the location of the closest match in the genome. I want to perform a *similarity search*. I find the DTW distance of my sequence with every subsequence of the human genome of equal length. The subsequence with the smallest DTW distance is the closest match. The pseudocode is something like this:

```python
search(candidate, series):
  for i = 0 to len(series) - len(candidate):
    distance = dtw(candidate, series[i:i + len(candidate)])
    if distance < best:
      best = distance
      match = series[i:i + len(candidate)]
  return best, match
```

There are few optimizations that are typically added in.

* Both the candidate sequence and the subsequence are z-normalized before they are fed into the DTW. This will help deal with scale invariance.
* Typically, the search is pruned. This means if we can stop the DTW calculation early on if we know the distance is going to be too big.
* The search can be easily parallelized, with a thread handling each search operation and locking around the updating of `best` and `match`.

Now to actually getting data. I acquired the entirety of the Homo Sapiens chromosome 10 from [this ftp link](ftp://ftp.ensembl.org/pub/release-74/fasta/homo_sapiens/dna/). It was over a 100 million base pairs long.


Here's a plot of the first 2000000 base pairs of chromosome 10:

<center><img src="/img/dna_2_mil.png" alt="First 2000000 base pairs of chromosome 10" style="width: 500px;"/></center>

## <a name='similaritysearch'></a> Similarity Search

Similarity search involves finding the location of the closest match to a candidate time series inside a larger time series. I attempted several different searches of different candidate DNA sequences inside the the first 1000 bases of chromosome 10. (I chose the first 1000 because anything longer took too long on my slow laptop).

### Test #1: Trivial

The search I first attempted was trivial. I searched for the 25 base pairs of chromosome 10 starting at index 0,`ATTCCTTGAGGCCTAAATGCATC` inside the first 1000 base pairs. This served mostly as a sanity check and indeed returned index 0 with a distance of 0.

**Actual index:** 0

**Estimated index:** 0

<table style='text-align:center;'>
    <tr>
    <td><img src="/img/dna_25_ts.png" width="300" height="auto"></td>
    <td><img src="/img/dna_1000_ts.png" width="300" height="auto"></td>
    <td><img src="/img/dna_match_1.png" width="300" height="auto"></td>
    </tr>
    <tr>
    <td>Candidate</td>
    <td>Time Series</td>
    <td>Match</td>
    </tr>
</table>

### Test #2: 5 Substitutions
Now DTW is supposed to be resistant to shift and noise. I decided to perform a couple of "mutations" on the candidate strand and redo the search.

I substituted 5 different base pairs for other ones, resulting in the strand `GTTCATTGATGCCAAACTGCATC`. The result was a match at index 2, which was very close to the correct index, 2. Look at the graphs below to see how the strands aligned with each other.

**Actual index:** 0

**Estimated index:** 2


<table style='text-align:center;'>
    <tr>
    <td><img src="/img/dna_25_modified_ts.png" width="300" height="auto"></td>
    <td><img src="/img/dna_1000_ts.png" width="300" height="auto"></td>
    <td><img src="/img/dna_match_2.png" width="300" height="auto"></td>
    </tr>
    <tr>
    <td>Candidate</td>
    <td>Time Series</td>
    <td>Match</td>
    </tr>
</table>

### Test #3: Different location with substitutions

Now instead of using the length 25 strand starting at 0, I used the one starting at 137, `GACGCGCTGTTCAGCCCTTTGAGTT`, mutating it into `GACGGGCTGTTAAGGCCTATCAGTT`. 
**Actual index:** 137

**Estimated index:** 96


<table style='text-align:center;'>
    <tr>
    <td><img src="/img/dna_tail_137.png" width="300" height="auto"></td>
    <td><img src="/img/dna_1000_ts.png" width="300" height="auto"></td>
    <td><img src="/img/dna_match_3.png" width="300" height="auto"></td> </tr>
    <tr>
    <td>Candidate</td>
    <td>Time Series</td>
    <td>Match</td>
    </tr>
</table>

Whoa, we were off there. However, the strand it got matched with was `AAACTATTAGATCGTGTGATTATATT`, which is pretty dissimilar to the strand we searched for. This may be an example where the strand was mutated beyond recognition. However, DTW returned a slightly closer result than the same search with Euclidean distance.

### Test #4: Deletions

The candidate I used was the strand starting at 137, but with two deletions, resulting in the candidate: `GACGCGCTGTTCAGCCCTTTGAG`

**Actual index:** 137

**Estimated index:** 137


<table style='text-align:center;'>
    <tr>
    <td><img src="/img/dna_tail_137_del2.png" width="300" height="auto"></td>
    <td><img src="/img/dna_1000_ts.png" width="300" height="auto"></td>
    <td><img src="/img/dna_match_4.png" width="300" height="auto"></td> </tr>
    <tr>
    <td>Candidate</td>
    <td>Time Series</td>
    <td>Match</td>
    </tr>
</table>

It was dead on! However, a quick check shows that Euclidean distance returns the same result.

## <a name='timeseries'></a> Conclusion

Well, although the DNA results weren't amazingly conclusive, it still shows us the power of DTW as a general distance algorithm. With bigger sets of data where the candidate queries are bigger and the time series being searched is bigger, DTW's robustness to noise will probably be a bit more visible. With that in mind, I just wanted to display a proof of concept of using DTW for simple similarity search in DNA. 

The full source code for the experiment can be found [here](http://www.github.com/sharadmv/dtw-dna).

Thanks for reading this blog post! I hope you learned something. Stay tuned for next part.
