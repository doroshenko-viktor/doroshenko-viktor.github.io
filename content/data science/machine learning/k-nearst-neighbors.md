---
title: K-nearest neighbors
date: "2023-08-23"
description: "K-nearest neighbors"
mainPage: false
---

## Number Of Neighbors

In the k-nearest neighbors (`k-NN`) algorithm, the parameter `k` (number of neighbors) denotes how many neighboring data 
points (or samples) the algorithm should consider when making a prediction for a new, previously unseen data point.

### Classification

For a given test point, the algorithm identifies the `k` training points that are closest to the point. The most frequent 
class/label among these `k` training points is then assigned to the test point.
For instance, if `k = 3` and among the three closest training points to the test point, two belong to class `A` and one belongs 
to class `B`, the test point will be classified as class `A`.

### Regression

For a given test point, the algorithm identifies the `k` training points that are closest to the point.
The average of the target values of these `k` training points is taken, and this average becomes the predicted value for the test point.

Choosing `k`:

- A smaller `k` (e.g., 1 or 3) makes the algorithm more sensitive to noise in the data. It can capture fine detail in the data but can also 
be more prone to `overfitting`.

- A larger `k` provides more smoothing and can be more resistant to noise in the training data. However, it may also be more 
prone to `underfitting`, missing out on finer details.

Often, the choice of `k` is validated using techniques like cross-validation to find a value that results in the best predictive 
performance on unseen data. 

Distance Metric:

The concept of "nearest" in `k-NN` is based on a distance metric, usually `Euclidean distance`. However, other distance metrics, 
such as `Manhattan distance` or `Minkowski distance`, can also be used. The choice of distance metric can influence which points 
are considered "nearest."

## Weights

`weight` refers to giving different importance or influence to the neighbors when making a prediction. The idea behind using 
weights is to give more influence to nearer neighbors than to farther ones. This can sometimes improve the performance of the 
`k-NN` algorithm, especially in cases where the nearest neighbors are much more relevant for prediction than the more distant ones.

There are two primary ways in which weights can be used in `k-NN`:

**Uniform Weights:**

This is the default and the simplest way. Each of the `k` neighbors has an equal vote in determining the predicted label 
(in classification) or contributes equally to the average (in regression).
In this approach, whether a neighbor is the closest or the `kth` closest, it gets the same weight.

**Distance-Based Weights:**

The weight of each neighbor is inversely proportional to its distance from the test point.
For example, a common method is to set the weight of each neighbor as the inverse of its distance. So, if the distance of a 
neighbor from the test point is `d`, the weight assigned to this neighbor would be `1/d`.

In this approach, closer neighbors have a more significant influence on the prediction than those farther away.
The choice of using uniform or distance-based weights often depends on the specific problem and dataset. Distance-based 
weighting can be especially beneficial when the decision boundary is irregular and when closer points are inherently more 
relevant than those farther away. However, in some cases, uniform weighting might perform just as well or even better. It's 
typically a good idea to experiment with both and use techniques like cross-validation to determine which approach works better 
for a given dataset.

