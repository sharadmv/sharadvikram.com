In this post, we'll be starting from the basics of probability and moving onto building a Bayesian classifier.

## Introduction to Machine Learning

Machine learning is a field in computer science all about computers learning from data. Most machine learning problems involve a *training* set, or a set of data that the computer analyzes and learns from, and a *test* set, one that is used to verify how well the computer has learned from the data.

We're going to use machine learning to solve a toy problem: classifying fish from their weight.

> Disclaimer: I know nothing about fish

Here's a an overly complicated scenario justifying this problem. Imagine we're out fishing for salmon but in the river there's both salmon and trout in the river. We want to be as efficient as possible so we don't want to waste our time reeling in trout. So, what we do instead guess what fish we have on the hook from our estimate of the fish's weight. If it's a salmon, we keep it. If not, we try again.

More formally, we're given a weight, $x$, and want to determine the class of fish, $y = \\{\text{salmon}, \text{trout}\\}$.

In this post, we're going to do supervised learning, or we'll have labeled training data. Specifically, we'll have a set of weights associated with salmon and a set of weights associated with trouts. In a later post on unsupervised learning, we'll have unlabeled training data, or we'll have data where each point could either belong to salmon or trout.

## Random Variables

In computer science and math, variables denote known and unknown quantities. However, in many scenarios we may know *something* about quantity. For example, we may know its range or what number it's most likely to be. The key is that we can put a *probability distribution* over all the possible values the random variable can take on.

More formally, for a given sample space, $\Omega$, we assign a real value $X(\omega)$. The random variable $X$ has a probability distribution associated with it, a mapping $X \rightarrow P(X = a) \;\forall a$ where $a$ covers all the possible values that $X$ can take on.

There are two main categories of random variables: discrete and continuous. The distinction is quite simple, but the math involving them changes a little. Discrete random variables are ones that only take on a finite set of values, such as $[1,2,3]$ or countably infinite, such as $[1, 2, 3, ...]$. Continuous variables take on values that are uncountably infinite, such as $\mathbb{R}$. Discrete random variables are associated with *probability mass functions* and continuous are associated with *probability density functions*.

Generally, there are several important quantities to understand when using random variables. The first is the expected value, or the *mean*, $\mu$. This is the average over all possible values of a random variable, weighted by the probability of that value happening, or:
<p>
\[
    \mathbb{E}[X] = \int_\mathcal{X} x\cdot P(x)dx
\]
</p>
Note that this formula is for continuous random variables and for discrete, the integral is replaced with a summation.

Another important quantity is the *mode*, or $\text{argmax}\_\mathcal{x \in X} \;x $ This is the most likely value for the random variable to take on. Note that this is also slighly different from the mean. For symmetrical distributions, the mean and the mode are the same, but are often different in asymmetrical distributions.

A last note on random variables: we can have observed random variables! Machine learning capitalizes on this by treating the data as a set of *observed* random variables and incorporating information about those variables to get more information about unobserved ones.

## Generative Models for Data

Back to the fish problem. Recall that we are doing a supervised learning problem, so each training data point is associated with its correct label. More formally, our training set is $X = \\{x\_i,y\_i\\}\_{i = 1}^N$, where $x\_i$ is each individual fish's weight and $y\_i$ is its class (salmon or trout, 0 or 1). Now I'm going to introduce the concept of a *generative model*. The idea behind generative models is that we think of *how* the data was generated. Specifically, we come up with a random process which could, in theory, produce the data. Here is an example process for our fish data. (Note: I'm going to assume that the each fish's weights are normally distributed.)

First, we pick a fish class, $y\_i$ at random. This fish will either be a salmon or trout, or 0 or 1. $y_i$ can be one of two values. We can think of selecting a fish as a biased coin flip, which is characterized by a Bernoulli distribution. If the coin comes up heads, we pick trout, and if it comes up tails we pick salmon, or:
<p>
\[
    P(y = 1) = p
\]
\[
    P(y = 0) = 1 - p
\]
</p>
Note that $p$ is an unknown parameter and we're going to leave it unknown in our model for now. To actually guess its value, we can use the data!

Now given that we know what $y\_i$ is, we pick a weight $x\_i$ from a Gaussian parametrized by $\mu\_{y\_i}, \sigma\_{y\_i}$. What this means intuitively is that there are two Gaussian distributions over weights. One is specifically for salmon, with parameters $\mu\_0$ and $\sigma\_0$ and the other is for trout with parameters $\mu\_1$ and $\sigma\_1$. Again, we don't know the specific means and standard deviations of these distributions, but we'll keep them as unknown variables for now.

This model can be written more concisely as:
<p>
\[
    y_i \sim \text{Bernoulli}(p)
\]
\[
    x_i | y_i \sim \mathcal{N}(\mu_{y_i}, \sigma_{y_i})
\]
</p>
So this is a process that generates a single data point. We now repeat $N$ times, and now we have a dataset.

## Maximum Likelihood Estimation

Now is the part of the problem where we incorporate the data. At this point, we assume that our data was generated from our model, but remember that our model isn't completely specified yet in that we left all the parameters of the distributions unknown. We now use *maximum likelihood estimation* to figure out these values.

We now consider the probability of our dataset. According to our model, every time we generate $N$ points it's most likely going to be different from another $N$ points we generate. Thus, each data set has its own probability of being generated.
<p>
\[
P(X) = P(x_1, y_1, x_2, y_2, ..., x_N, y_N)
\]
</p>
Now we make another critical assumption. We assume that the data points were sampled *independently* of each other. This assumption allows us to treat each data point individually and the probability of the dataset breaks down to:
<p>
\[
P(X) = \prod_{i = 1}^N P(x_i, y_i)
\]
</p>
The expression $P(x\_i, y\_i)$ is actually quite tricky to write out completely. Remember that according to our model, we can break it down to:
<p>
\[
P(x_i, y_i) = P(y_i)P(x_i | y_i)
\]
</p>
