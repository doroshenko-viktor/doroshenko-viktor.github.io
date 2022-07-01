---
title: State Pattern
date: "2022-05-13"
description: "State design pattern overview and application"
mainPage: true
---

`State` object oriented design pattern is useful, when object should frequently change it's behavior
depending on it's current state. 

At any point in time object may have certain state, which will affect it's behavior. Object can change it's state, but this change have to be valid according to defined transition rules. In other words object defines it's rules for state transitions and validates any state transition. So some state changes may be applied and some rejected. 

Usually these transition is a some kind of `Finite State Machine`. In simplest solution transition rules are implemented with `switch` or trees of `if/else` conditions. 
When amount of states is big or, when we frequently add new behavior, it is not only becomes hard to manage such code, but there will be much higher chance of an error.

## When To Use

`State` pattern is useful, when object has some set of methods and behavior of these methods should vary depending on a state this object currently has. 
Important to note that `State` pattern is applicable, when all of object behavior methods are applicable in all states, but behave differently.

It follows `Single Responsibility` and `Open/Closed` principles. When adding new behavior, we need to add new state classes, but not required to change much of existing codebase. When some of the states requirement changes, only particular state logic will be required to be changed not affecting other states.

But even if applicable, using state may be an over-engineering in simple scenarios with little concrete
states amount and when logic depending on this states changes not very often. It is always worth to analyze if using the pattern will solve a problem in a more efficient way, than it is already implemented.

## Implementation

Following `State` design pattern, we need to create new object which will encapsulate general object behavior. This object called `context`. 
And create separate objects, which represent each `state` of parent object. All of the state objects
must implement common state interface. It may be particular language construction, like `interface`
in C# and Java or simply have same methods for dynamic languages. 
`Context` contains single object of `State` interface, which represents current object state.

`Context` object should have special method for changing it's state and it will receive `state` objects.

`State` methods should be applicable for all possible object state, but their behavior on different states may vary.

It is allowed for `state` to have back reference to it's parent `context`. Such a way state may receive
some data from the context.


## References

- [Refactoring Guru](https://refactoring.guru/design-patterns/state)
- [Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine#UML_state_machines)