---
title: Patterns To Be Aware Of
date: "2022-05-25"
description: "Description of little patterns, worth to know about, but too little for separate document"
---

## Gateway

When application accessing third party API there is some complexity of this API leaking to our business
logic. `Gateway` pattern allows to encapsulate this complexity in specialized module which implements
interface, defined by application business. Such a way application knows only those behavior and dtos
which are enough for it. 

Moreover it protects application core from future changes in this external resource. While all logic,
concentrated inside single instance, responsible for communication with external resource, any changes
in it may be addressed in this module.