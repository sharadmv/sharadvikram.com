I thought for my first blog post, I'd introduce a topic that's not super well known: dynamic time warping (DTW).

## <a name='background'></a> Background

DTW is a an algorithm used to compare vectors to each other and operates similarly to Euclidean distance. The inputs are two vectors of numbers and the output is a distance score. Let's run through some examples of Euclidean distance first.

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

* The vectors do not have to be the same length and the difference in length will be taken into account in the score
* The vectors can be "shifted in time" and still result in a similar score. We'll go into why this is important later.
* DTW can help mitigate noise in data. We'll see this again in more detail later
* It is a more general form of Euclidean distance, so with some tweaking, we can always fall back to Euclidean distance if necessary.
* The DTW distance will never overestimate, or, $DTW(\vec{v}, \vec{w}) \leq Euclidean(\vec{v}, \vec{w})$.

## <a name='whatisdtw'></a> What is DTW?

Let's take a closer look at the formula for Euclidean distance.
<p>
\[
    Euclidean(\vec{v}, \vec{w}) = \sqrt{\sum_{i = 1}^{n}(\vec{v}_i - \vec{w}_i)^2}
\]
</p>
For each value in the first vector, $\vec{v}\_i$, we compare it to a single other point, $\vec{w}\_i$. The quantity $(\vec{v}\_i - \vec{w}\_i)^2$ is that $i$'s contribution to the distance between the two vectors.

DTW allows wiggle room when we compare the vectors to each other. Instead of comparing $v\_i$ to $w\_i$, we'll compare $v\_i$ to $w\_{(i \pm k)}$, where $k$ is a parameter. We'll choose the minimum out of the $2k + 1$ choices, and that will be the contribution by $v_i$. For example, if we're comparing the vectors $\vec{v} = [1, 2, 3, 4]$ and $\vec{w} = [2, 3, 4, 5]$ with $k = 1$ and $i = 2$, we'd compare $\vec{v}\_2 = 2$ with each of $\vec{w}\_1, \vec{w}\_2$, and $\vec{w}\_3$, instead of just $\vec{w}\_2$ and pick the smallest distance out of the 3.

Thus, a simplistic formula for DTW that assumes the vectors are the same length is:
<p>
\[
    DTW(\vec{v}, \vec{w}) = \sqrt{\sum_{i = 0}^{n}\min_{j=i-k}^{i+k}(\vec{v}_i - \vec{w}_j)^2}
\]
</p>

Let's run through the full calculation for the two vectors $\vec{v} = [1, 2, 3, 4]$ and $\vec{w} = [2, 3, 4, 5]$ with $k = 1$.

For $i = 1$, we're comparing $\vec{v}\_1 = 1$ first with $\vec{w}\_1$, and then $\vec{w}\_2$. Note that we aren't going into negative indices, and we instead just stop at $0$. The contribution of $i = 1$ is the $\min$ of the two distances. $(\vec{v}\_1 - \vec{w}\_1)^2 = 1$ and $(\vec{v}\_2 - \vec{w}\_2)^2  = 4$, so the contribution of $i = 1$ is $1$.

For $i = 2$, we're comparing $\vec{v}\_2 = 1$ with $\vec{w}\_1$, $\vec{w}\_2$, and $\vec{w}\_3$. The three distances are $0, 1, 4$, respectively, so the score we get for $i = 2$ is $0$.

For $i = 3$ and $i = 4$, the pattern repeats and we get a score of $0$ again.

Thus, the total DTW distance with $k = 1$ is $\sqrt{1 + 0 + 0 + 0} = 1$. Compare this with the Euclidean distance between the two vectors, which is $4$.
