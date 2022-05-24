---
title: Anemic Domain Model
date: "2022-05-24"
description: "Domain Driven Design Anemic domain model description and pitfalls"
---

`Anemic Domain Model` is a such domain model, which contains no or very little of business logic.
Usually this appears as domain model in simple type with all open fields and no behavior. In such
cases all business logic lives in separate services, which use domain model public fields to get
data for it's manipulation.

Main downside of this approach is code duplication. When we have a single domain model and various
use case services, which use it and implement business logic tightly related to this model it is
inevitably leads to duplication of this logic in different use cases. Than later, when our requirements
on this logic will change it may cause issues, because we need to change all places, where this
duplicated logic exists. It is highly possible, that we will change not all instances of this logic. 
This also raises cognitive complexity, because we need to remember `n` business logic variants in `m` use cases.

When domain related logic is placed near to the domain entity we reduce duplication and make future
changes easier and less error prone. It is always easy to start searching for some business logic in 
a singe domain entity, than exploring whole bunch of use cases.

This means, that those logic, which is highly related to the business object itself should be placed
directly inside this business entity and those logic, which may not be placed into entity, but still
related to it, like validation, should be placed inside domain service and not on application layer.

In application layer there should be only logic related to particular use cases, which can't be
encapsulated or reused by other services.

And logic related to external resources, like databases, queues, calls to external services, should
be placed inside infrastructure layer.

The downside of this separation is of course - implementation time. So it is always good to analyze
if benefits of `rich domain model` worth time spent on it's implementation. In cases, when this is
a one-time use application, prototyping, proof of concept it is likely that `anemic domain model`
has it's benefits of fast implementation.

## Resources

- [Anemic Domain Model](https://khalilstemmler.com/wiki/anemic-domain-model/)