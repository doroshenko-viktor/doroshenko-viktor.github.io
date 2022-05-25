---
title: DDD Services In Different Layers
date: "2022-05-25"
description: "Domain Driven Design Domain, Application and Infrastructure services"
---

## Domain Services

`Domain services` are services, which encapsulate business logic, specific to the bounded context
they related to. They include those part of the business logic, which can't be directly included 
into domain entity.
Being a core layer functionality, domain services heavily use domain specific ubiquitous language.

They normally not include any particular use case specific or persistence logic and code, related to interference with external services.

According to Eric Evans:

> When a significant process or transformation in the domain is not a natural responsibility of an ENTITY or VALUE OBJECT, add an operation to the model as standalone interface declared as a SERVICE. 
> Define the interface in terms of the language of the model and make sure the operation name is part of the UBIQUITOUS LANGUAGE. Make the SERVICE stateless.

It is important to keep track of what logic goes to this services and not overuse it, because
it may lead to appearance of anemic domain models with all logic in services and domain entities
playing role of simple data structures.


## Application Services

`Application services` include logic, specific only to some particular application use case. Such
code normally can't be encapsulated into separate object and can't be reused across application.
`Application service` is an external boundary of application. External layer for them will be e.g.
web-framework, console application or any other concrete way to ship our application to the world.
Application layer usually has a translation role between external environment and application core. So it also known as interface to the domain.

## Infrastructure Services

`Infrastructure services` used to encapsulate logic, related to external service calls, persistence, connectivity of all kinds, like queues, sending notifications, messages or file system access e.t.c. In other words `IO` of any kind.
Usually on this level there will be placed various anti-corruption services, encapsulating usage of drivers. 

Infrastructure layer services should not contain any core business logic. They also usually don't use domain specific ubiquitous language natural for domain services. They have simple concern on low level functionality. And when domain level needs to use this functionality they use infrastructure service through defined interface. So that allows to decouple low level functionality from application core.



## Resources

- [Services in Domain-Driven Design (DDD)](http://gorodinski.com/blog/2012/04/14/services-in-domain-driven-design-ddd/)