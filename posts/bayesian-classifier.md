In this post, we'll be starting from the basics of probability and moving onto building a Bayesian classifier.

## Introduction to Machine Learning

Machine learning is a field in computer science all about computers learning from data. Most machine learning problems involve a *training* set, or a set of data that the computer analyzes and learns from, and a *test* set, one that is used to verify how well the computer has learned from the data.

We're going to use machine learning to solve a toy problem: classifying fish from their weight.

> Disclaimer: I know nothing about fish

Here's a an overly complicated scenario justifying this problem. Imagine we're out fishing for salmon but in the river there's both salmon and trout in the river. We want to be as efficient as possible so we don't want to waste our time reeling in trout. So, what we do instead guess what fish we have on the hook from our estimate of the fish's weight. If it's a salmon, we keep it. If not, we try again.

More formally, we're given a weight, $x$, and want to determine the class of fish, $y = \\{\text{salmon}, \text{trout}\\}$.

In this post, we're going to do supervised learning, meaning we'll have labeled training data. Specifically, we'll have a set of weights associated with salmon and a set of weights associated with trouts. In a later post on unsupervised learning, we'll have unlabeled training data, meaning we'll have data where each point could either a salmon or a trout.

## Random Variables

In computer science and math, variables denote known and unknown quantities. However, in many scenarios we may know *something* about quantity. For example, we may know its range or what number it's most likely to be. The key is that we can put a *probability distribution* over all the possible values the random variable can take on.

The random variable $X$ has a probability distribution associated with it, a mapping $X \rightarrow P(X = a) \;\forall a$ where $a$ covers all the possible values that $X$ can take on. In simpler terms, each value that a random variable can take on has an associated likelihood.

There are two main categories of random variables: discrete and continuous. The distinction is quite simple, but the math involving them changes a little. Discrete random variables are ones that only take on a finite set of values, such as $[1,2,3]$ or countably infinite, such as $[1, 2, 3, ...]$. Continuous variables take on values that are uncountably infinite, such as $\mathbb{R}$. Discrete random variables are associated with *probability mass functions* and continuous are associated with *probability density functions*.

Generally, there are several important quantities to understand when using random variables. The first is the expected value, or the *mean*, $\mu$. This is the average over all possible values of a random variable, weighted by the probability of that value happening. Let $\mathcal{X}$ be the space of all possible values that $X$ can take on. We can thus express the expected value of $X$ as the following integral over all possible values of $X$:
<p>
\[
    \mu = \mathbb{E}[X] = \int_\mathcal{X} x\cdot P(x)dx
\]
</p>
Note that this formula is for continuous random variables and for discrete, the integral is replaced with a summation.

Another important quantity is the *mode*, or $\text{argmax}\_\mathcal{x \in X} \;P(x) $ This is the most likely value for the random variable to take on. Note that this is also slighly different from the mean. For symmetrical distributions, the mean and the mode are the same, but they are often different for asymmetrical distributions.

A last note on random variables: we can have "observed" random variables, or random variables whose values are known for certain! Machine learning capitalizes on this by treating the data as a set of *observed* random variables and incorporating information about those variables to get more information about unobserved ones, such as the class of unlabeled data.

## Generative Models for Data

Back to the fish problem. Recall that we are doing a supervised learning problem, so each training data point is associated with its correct label. More formally, our training set is $X = \\{x\_i,y\_i\\}\_{i = 1}^N$, where $x\_i$ is each individual fish's weight and $y\_i$ is its class (salmon or trout, 0 or 1). Now I'm going to introduce the concept of a *generative model*. The idea behind generative models is that we think of *how* the data was generated. Specifically, we come up with a random process which could, in theory, produce the data. Here is an example process for our fish data. (Note: I'm going to assume that the each fish's weights are normally distributed.)

Here's a little more about generative models. Designing a generative model involves thinking in reverse. Instead of thinking about the specific data points we have (which is the another popular strategy in machine learning), we just think of our current dataset as one of many possible datasets, all coming from the same process. If we were to collect data again, we'd obtain a completely different dataset, but the core process would remain the same.

Here's the model we'll use for this problem to create a dataset ${x\_i, y\_i}$ of size $N$:

1. Sample a class $y\_i$ from a Bernoulli distribution.
2. Sample a weight, $x\_i$, from a Gaussian distribution specific to the class we chose in step 1.
3. Repeat step 1 and 2 $N$ times.

First thing to note is that this process is ambiguous. I left out some of the fundamental parts, namely the parameters of the distributions. Let's dive a little more into the probability distributions we're dealing with.

First, we pick a fish class, $y\_i$ from a Bernoulli distribution. We can think of selecting a fish as a biased coin flip. If the coin comes up heads, we pick trout, and if it comes up tails we pick salmon, or:
<p>
\[
    P(y = 1) = p
\]
\[
    P(y = 0) = 1 - p
\]
</p>
Note that $p$ is an unknown parameter and we're going to leave it unknown in our model for now. To actually guess its value, we use the data, but we'll get to that later.

Now given that we know what $y\_i$ is, we pick a weight $x\_i$ from a Gaussian parametrized by $\mu\_{y\_i}, \sigma\_{y\_i}$ (mean and standard deviation). What this means intuitively is that there are two Gaussian distributions over weights. One is specifically for salmon, with parameters $\mu\_0$ and $\sigma\_0$ and the other is for trout with parameters $\mu\_1$ and $\sigma\_1$. When we index into $\mu$ with $y\_i$, we're just choosing the appropriate parameter for either salmon or trout, because $y\_i$ takes on either 0 or 1. Again, we don't know the specific means and standard deviations of these distributions, but we'll keep them as unknown variables for now.
<p>
\[
    P(x | y = 1) = \mathcal{N}(\mu_1, \sigma_1)
\]
\[
    P(x | y = 0) = \mathcal{N}(\mu_0, \sigma_0)
\]
</p>

This model can be written more concisely as:
<p>
\[
    y_i \sim \text{Bernoulli}(p)
\]
\[
    x_i | y_i \sim \mathcal{N}(\mu_{y_i}, \sigma_{y_i})
\]
</p>

> Note: the $\sim$ notation tells us that a random variable is "distributed as" a probability distribution.

So this is a process that generates a single data point. We now repeat $N$ times, and now we have a dataset.

## The Likelihood of the Data

Now is the part of the problem where we incorporate the data. At this point, we assume that our data was generated from our model, but remember that our model isn't completely specified yet in that we left all the parameters of the distributions unknown. We now use *maximum likelihood estimation* to figure out these values.

We now consider the probability of our dataset, $P(X)$. According to our model, every time we generate $N$ points it's most likely going to be different from another $N$ points we generate. Thus, each data set has its own probability of being generated.
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
The expression $P(x\_i, y\_i)$ is actually quite tricky to write out completely. By the chain rule, we can break it down to:
<p>
\[
P(x_i, y_i) = P(y_i)P(x_i | y_i)
\]
</p>
These are both probability distributions specified by our model! The proper way to express $P(y\_i)$ according to its Bernoulli distribution is:
<p>
\[
P(y_i) = p^{\mathbb{1}(y_i = 1)}(1 - p)^{\mathbb{1}(y_i = 0)}
\]
</p>
This is a specific application of the *multinomial trick* and utilizes *indicator functions*. The indicator function, $\mathbb{1}$, returns $1$ if its condition evaluates to true and 0 if it is false. It functions as a sort of mathematical if-statement. Please look at this equation and make sure you understand it, as the multinomial trick and indicator functions are very often seen in statistics.

$P(x\_i | y\_i)$ is our Gaussian distribution specific to a fish. However, we only know $P(x\_i | y = 0)$ and $P(x\_i | y = 1)$. Here again we invoke the multinomial trick.
<p>
\[
P(x_i | y_i) = \prod_{c = 0}^1 P(x_i | y_i = c)^{\mathbb{1}(y_i = c)} = \prod_{c = 0}^1 \mathcal{N}(\mu_c, \sigma_c)^{\mathbb{1}(y_i = c)}

\]
</p>
This equation is super important. Note how since $y\_i$ can only be either $0$ or $1$, only one of the Gaussian distributions will actually be used as the other will be raised to the power of $0$.

We've now specified the complete probability of the dataset, a term also called **likelihood**.
<p>
\[
P(X) = \prod_{i = 1}^N P(x_i, y_i) = \prod_{i = 1}^N \left(p^{\mathbb{1}(y_i = 1)}(1 - p)^{\mathbb{1}(y_i = 0)} \prod_{c = 0}^1 \mathcal{N}(\mu_c, \sigma_c)^{\mathbb{1}(y_i = c)}\right)
\]
</p>

Now the really amazing thing about this equation is that since $x\_i$ and $y\_i$ are known (since they're the data), the only unknowns in this equation are the *parameters*. Remember that the parameters were the only missing piece in our model and since they are now unknowns in this equation we can solve for them. The key idea is that we select parameters that *maximize* the likelihood of the data.

## Maximum Likelihood Estimation

The basic idea behind maximum likelihood estimation, or MLE, is that we create a likelihood function for our data, typically derived from our model. Once we have this likelihood function, which is a function of the unknown parameters in our model, we maximize the likelihood with respect to the parameters. More formally:

Let $L(\theta | X)$ be our likelihood function where $\theta$ are all our parameters. We select $\theta$ such that $\theta = \text{argmax}\_\theta (L(\theta | X))$. A common trick to make this process much easier is instead of working with the likelihood function, we work with the log-likelihood function. The reason we are allowed to do this is because the logarithm is a monotic function and won't change the location of maxima with respect to $\theta$.
<p>
\[
L(p, \mu_c, \sigma_c | X) = \prod_{i = 1}^N P(x_i, y_i) = \prod_{i = 1}^N (p^{\mathbb{1}(y_i = 1)}(1 - p)^{\mathbb{1}(y_i = 0)} \prod_{c = 1}^2 \mathcal{N}(\mu_c, \sigma_c)^{\mathbb{1}(y_i = c)})
\]
</p>
<p>
\[
\log L(p, \mu_c, \sigma_c | X) = \sum_{i = 1}^N P(x_i, y_i) = \sum_{i = 1}^N (\mathbb{1}(y_i = 1)\log p + \mathbb{1}(y_1 = 0)\log (1 - p))  + \sum_{i = 1}^N \sum_{c = 1}^2 \mathbb{1}(y_i = c)\log \mathcal{N}(\mu_c, \sigma_c)
\]
</p>

We now take partial derivatives with respect to the parameters and solve for a critical point. We'll start with $p$.
<p>
\[
\frac{\partial \log L}{\partial p} = 0
\]
</p>
<p>
\[
\sum_{i = 1}^N \left(\frac{\mathbb{1}(y_i = 1)}{p} - \frac{\mathbb{1}(y_i = 0)}{1 - p}\right) = 0
\]
</p>
<p>
\[
\left(\frac{C_1}{p} - \frac{C_0}{1 - p}\right) = 0
\]
</p>
where $C\_1$ and $C\_0$ are the *counts* of the occurrences of $y\_i = 1$ and $y\_i = 0$ respectively; or simply put, the number of trout and number of salmon in our training set.
<p>
\[
C_1(1 - p) - C_0p = 0
\]
</p>
<p>
\[
p = \frac{C_1}{C_0 + C_1} = \frac{C_1}{N}
\]
</p>
Whoa, this is interesting. Our best guess for $p$ from the data is fraction of the training data that is trout. Now consider this equivalent scenario. We flip a coin with unknown bias $p$ 10 times and we get 7 heads. Our MLE guess tells us that the best guess for the $p$ for this coin is $0.7$. Hopefully, this solution will make sense to you.
> Note: our guess for $p$ is by no means the actual value of $p$. It is derived from our data, which may or may not actually represent what actually happens. Thus our MLE guess is called the *maximum likelihood estimator*.

Now let's do the same for $\mu\_c$.
<p>
\[
\frac{\partial \log L}{\partial \mu_c} = 0
\]
</p>
<p>
\[
\sum_{i=1}^N \frac{\partial \mathbb{1}(y_i = c)\log N(\mu_c, \sigma_c)}{\partial \mu_c} = 0
\]
</p>
<p>
\[
\sum_{i=1}^N \frac{\partial\left(\mathbb{1}(y_i = c)\log\left(\frac{1}{\sqrt{2\pi\sigma_c^2}}\right) - \frac{1}{2\sigma_c^2}(x_i - \mu_c)^2\right)}{\partial \mu_c} = 0
\]
</p>
<p>
\[
\sum_{i=1}^N \mathbb{1}(y_i = c)\frac{1}{\sigma_c^2}(x_i - \mu_c) = 0
\]
</p>
<p>
\[
\mu_c = \frac{\sum_{i = 1}^N x_i\mathbb{1}(y_i = c)}{\sum_{i = 1}^N\mathbb{1}(y_i = c)}
\]
</p>
<p>
\[
\mu_c = \frac{\sum_{i = 1}^N x_i\mathbb{1}(y_i = c)}{C_c}
\]
</p>
This should also be an equation that's familiar. This is the common formula for the mean, or average of the data. However, we have that weird indicator function in there. What is really means is that when calculating our guess for, say $\mu\_1$, we only consider training data that belongs to class $1$. Thus, the estimator for the center of the Gaussian for a given class is the average of all data points from that class.

Our last unknown parameter is $\sigma\_c$, which we'll solve for now.
<p>
\[
\frac{\partial \log L}{\partial \sigma_c} = 0
\]
</p>
<p>
\[
\sum_{i=1}^N \frac{\partial \mathbb{1}(y_i = c)\log N(\mu_c, \sigma_c)}{\partial \mu_c} = 0
\]
</p>
<p>
\[
\sum_{i=1}^N \frac{\partial\left(\mathbb{1}(y_i = c)(-\log\sqrt{2\pi\sigma_c^2} - \frac{1}{2\sigma_c^2}(x_i - \mu_c)^2\right)}{\partial \sigma_c} = 0
\]
</p>
<p>
\[
\sum_{i=1}^N -\mathbb{1}(y_i = c)\left(-\frac{1}{\sigma_c} + \frac{1}{\sigma_c^3}(x_i - \mu_c)^2\right) = 0
\]
</p>
<p>
\[
\sum_{i=1}^N -\mathbb{1}(y_i = c)\left(-1 + \frac{1}{\sigma_c^2}(x_i - \mu_c)^2\right) = 0
\]
</p>
<p>
\[
\sigma_c = \sqrt{\frac{\sum_{i = 1}^N \mathbb{1}(y_i = c)(x_i - \mu_c)^2}{\sum_{i = 1}^N \mathbb{1}(y_i = c)}}
\]
</p>
Intuitively, our guess for the standard deviation, $\sigma_c$, corresponds to the standard deviation of the samples corresponding to class $c$.

Well, we're now done with parameter estimation and have successfully incorporated the training data to fully specify our model.

## Bayesian Classification

Now it comes to the test data. Imagine we're presented with a test weight, $x^\*$. We want to decide which class to label it as ($y^\* = 0$ or $y^\* = 1$). The basic idea is that we calculate the posterior probability of the class given the data, or $P(y^\* | x^\*)$. We do this for both classes, or calculate $P(y^\* = 0 | x^\*)$ and $P(y^\* = 1 | x^\*)$ and select the class with the larger posterior. In more mathematical terms, we make the decision, $\text{argmax}\_c P(y^\* = c | x^\*)$.

The key idea behind calculating this posterior is that by invoking Bayes rule, we get an expression with terms we're familiar with:
<p>
\[
P(y^* = c | x^*) = \frac{P(x^* | y^* = c)P(y^* = c)}{P(x^*)}
\]
</p>
The first term, $P(x^\* | y^\* = c)$ is our Gaussian term from our generative model and is called the *likelihood*. For each class, we can just evaluate the p.d.f. at the test point. The second term, $P(y^\* = c)$ comes from our Bernoulli term, and is also called the *prior* probability of the class. Combining the likelihood and the prior gives us the posterior (after normalization). The normalization term, $P(x^\*)$, isn't necessary to calculate since it's the same across all classes. Thus, if we just want to pick the class with the maximum posterior probability, we only need to pick $\text{argmax}\_c P(x^\* | y^\* = c)P(y^\* = c)$.

Another thing to note is that the sum of the posterior probabilities over each class is 1. This makes sense in that there are only a finite set out of outcomes for the actual class of a given test point. However, this lets us find a *decision boundary*, or a value of $x$ such that if it's bigger, we decide one class, and if its smaller, we pick the other class. 

The decision boundary occurs when $P(y^* = 0|x^*) = P(y^* = 1|x^*)$ and since they sum to 1, its when $P(y^* = 0|x^*) = P(y^* = 1|x^*) = 0.5$.
<!--<p>-->
<!--\[-->
<!--P(y^* = 1|x^*) = P(y^* = 0|x^*) -->
<!--\]-->
<!--</p>-->
<!--<p>-->
<!--\[-->
<!--\frac{P(x^*|y^* = 1)P(y^* = 1)}{P(x^*)} = \frac{P(x^*|y^* = 0)P(y^* = 0)}{P(x^*)} -->
<!--\]-->
<!--</p>-->
<!--<p>-->
<!--\[-->
<!--P(x^*|y^* = 1)P(y^* = 1) = P(x^*|y^* = 0)P(y^* = 0)-->
<!--\]-->
<!--</p>-->
<!--<p>-->
<!--\[-->
<!--\log P(x^*|y^* = 1) + \log P(y^* = 1) = \log P(x^*|y^* = 0) + \log P(y^* = 0)-->
<!--\]-->
<!--</p>-->
<!--<p>-->
<!--\[-->
<!---\log \sqrt{2\pi\sigma_1^2} - \frac{1}{2\sigma_1^2}(x - \mu_1)^2 + \log p = -\log \sqrt{2\pi\sigma_0^2} - \frac{1}{2\sigma_0^2}(x - \mu_0)^2 + \log (1 - p)-->
<!--\]-->
<!--</p>-->

## Simulated Data Example

Let's try using some data I've simulated to test our classifier. Let's imagine I know the entire model (including parameters) before hand and I generate training data. The code for this example is located [here](https://github.com/sharadmv/basic-bayesian-classifier):

Here's some example training data (100000 points):
```
13.6430793076   1
11.2648606831   1
27.6889367226   0
14.5519403098   1
30.0767707261   0
16.2293169035   1
27.3717955287   0
30.0213125657   0
19.0812032707   1
17.8277538314   1
13.8599922535   1
29.7796857052   0
16.9996520561   1
29.188740891    0
17.139381494    1
20.2160100092   1
14.4899334478   1
29.2177254475   0
17.6716004307   1
14.039478894    1
31.034316256    0
17.1597486499   1
18.7970889293   1
28.8384902215   0
29.0724679848   0
...
```


Here's a histogram of the training data, colored by class.
<center>
<table>
    <tr>
    <td><img src="/img/bayes-training_data.png" width="800" height="auto"></td>
    </tr>
    <tr>
    <td style='text-align:center;'>Histogram of training data</td>
    </tr>
</table>
</center>

Note that I know the actual values of the parameters, but we'll see how close our MLE guesses are.

The counts of the data are: $[29943, 70057]$. Our estimate of the parameter $p$ is thus $p = \frac{70057}{100000} = 0.70057$.

Now, we'll proceed with maximum likelihood estimation to fit Gaussians to the data.
<p>
\[
\mu_0 = 29.99
\]
</p>
<p>
\[
\sigma_0 = 3.99
\]
</p>
<p>
\[
\mu_1= 15.98
\]
</p>
<p>
\[
\sigma_1= 2.99
\]
</p>

Here are the plots of these Gaussians along with the normalized histogram of their data so you can see how close the fit is.
<center>
<table>
    <tr>
    <td><img src="/img/gaussian-0.png" width="400" height="auto"></td>
    </tr>
    <tr>
    <td style='text-align:center;'>Fitted Gaussian for Salmon</td>
    </tr>
    <tr>
    <td><img src="/img/gaussian-1.png" width="400" height="auto"></td>
    </tr>
    <tr>
    <td style='text-align:center;'>Fitted Gaussian for Trout</td>
    </tr>
</table>
</center>

Wow our MLE estimates seem to be pretty good. This is because we have a lot of data points.
The actual values for the parameters that I kept hidden from you were:
<p>
\[
\mu_0 = 30
\]
</p>
<p>
\[
\sigma_0 = 4
\]
</p>
<p>
\[
\mu_1= 16
\]
</p>
<p>
\[
\sigma_1= 3
\]
</p>

After testing the classifier with a separate testing dataset, I got an error rate of 2.89%. Whoa, not bad! Then again, I was training with a lot of examples (100000).

## Conclusion

In this post, I tried to build basic Bayesian classification from scratch (random variables and data). Although the example involved one-dimensional data and only two classes, the methods I describe easily extend to multiple dimensions and multiple classes. For example, instead of using the univariate normal, you'd upgrade to the [multivariate Gaussian distribution](http://en.wikipedia.org/wiki/Multivariate_normal_distribution) and instead of using the Bernoulli for the classes, you'd use the [multinomial](http://en.wikipedia.org/wiki/Multinomial_distribution). These are very cool areas to experiment in and it's a good exercise to extend this sort of classifier.

Next week, we'll be dealing with a slight modification of the trout problem, except it'll be unsupervised learning instead of supervised. This will introduce all sorts of complications that we'll have to overcome. I hope you're excited! Thanks for reading.
