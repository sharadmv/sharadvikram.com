I thought for my first blog post, I'd introduce a topic that's not super well known: dynamic time warping, or DTW.

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

When we have a vector, say $[1,2,3,4]$, we can perform any of three operations to change it: an insertion, deletion, or substition. Each of these operations returns a new vector and has a *cost* associated with it. For most of the examples, I'll be using a squaring cost function. For example, the cost of a substition (let's say turning the $1$ into a $4$) could be the squared difference of the substition ($4^2 - 1^1 = 15$). The cost of an insertion could be square of the number inserted (i.e. turning $[1,2,3,4]$ into $[1,2,3,4,5]$ would have cost $25$). The cost for a deletion would be the square of the number deleted.

Given these three operations and their cost, we can figure out the minimum cost series of insertions, deletions, and substitions needed to turn a vector into the other. This the core of the DTW distance.

> *Example:* The cost of turning $[1,2,3,4]$ into $[1,2]$ would be $3^2 + 4^2 = 25$.

How can we actually find this quantity? When the vectors are longer, there could (and probably will be) multiple combinations of insertions, deletions, and substitions to transform one into the other and different costs associated with them. Finding the minimum won't be as trivial as looking at the two vectors and figuring it out.

We can think of a recursive solution to this problem.
