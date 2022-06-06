---
title: Neural Networks 101
date: "2022-06-06"
description: "Introduction to neural networks"
---

`Feedforward neural network` consists of two main components - `neurons` and `synapses`. 

![neural network example](/_images/neural-networks-1.png)

On this example we see simple neural network with 3 neurons and 5 synapses.
There are two layers - inputs and outputs layers. There may be more layers with arbitrary number
of neurons. These middle layers are called hidden. But on input and output layers we have same amount of neurons as we have input sources
and outputs we want to receive.

The more layers and neurons neural network has, the more advanced and abstract concept it can handle.

Basic principle of `FFNN` - send some numbers to the inputs, than neural network propagating these
values through it's neurons, which change the values somehow. This is called `feedforwarding`. And
on the output we receive some changed numbers, which in their turn will be an answer.

For the neural network this is only numbers and their respective change. We give these numbers their
meaning. For example, we send to the neural network a picture as a bite array and on single output
we have a number between 0 and 1. We decide, that this output means presence or absence of some object
on the provided image. Initially all outputs of our network may be completely useless. We need to
train neural network. Feeding it with some data set and giving a feedback we seek a moment, when
it will return proper output. From now on we can consider our neural network trained and can feed it
with some new data, which it does not know yet and with high probability will get meaningful results.

`neurons` are processing unit, which has at least one input and output. It receives some value,
changes it with some criteria and returns changed value into output. Neuron has a `bias`, which 
works similarly to threshold - when input value is big enough it will be propagated, otherwise will
output 0.

`synapses` are connections between `neurons`. Each synapse has `weight`, which is a multiplicator on
a value, transferred through this synapse. 

![neural network with weights and biases](/_images/neural-networks-2.png)

On the first attempt we can give weights and biases totally random values. And then we need to train
neural network in order to get meaningful results. To do that some algorithms used, for example
`back propagation`. It works like that: network is feed with some amount of different data, it 
responds to it and here we need to tell it the correct result it should have been responded with.
Back propagation goes back on neural network, adjusting weights and biases accordingly. This 
approximates future results.

Important to note, that this learning may improve results to some close point or stop on local
optimum and not improve further.

Back propagation is good, when we have rich set of data with certain output.



## References

- [](https://pwy.io/en/posts/learning-to-fly-pt1/)
- [A Comprehensive Guide to Convolutional Neural Networks — the ELI5 way](https://towardsdatascience.com/a-comprehensive-guide-to-convolutional-neural-networks-the-eli5-way-3bd2b1164a53)
- [Multilayer perceptron](https://en.wikipedia.org/wiki/Multilayer_perceptron)
- [Feedforward neural network](https://en.wikipedia.org/wiki/Feedforward_neural_network)