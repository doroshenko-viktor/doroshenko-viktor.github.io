---
title: TypeScript Decorators
date: "2022-07-19"
description: "Creation of decorators in TypeScript"
mainPage: true
---

Decorator is a function, which wraps other entity, like class, property, method, accessors or 
parameter and extending it's behavior. 

To enable decorators support TypeScript need to add following in project's `tsconfig.json`:

```json
{
    "compilerOptions": {
        // ...
        "experimentalDecorators": true
    }
}
```

## Class Decorators

This type of decorators is applied directly on classes. It can intercept class constructor.
This type of decorator is called in time of class declaration and not in time of class
instantiation.

For example, decorator, which makes instance of the class sealed:

```ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

Or class decorator can intercept constructor and return inherited class instead:

```ts
export const entity = <T extends { new (...args: any[]): {} }>(target: T) => {
  return class extends target {
    public id = Math.random();
    public createDate = Date.now();
  };
};
```

Here, when using `@entity` on some class it will add random id and creation date as current date:

```ts
@entity
class TestClass {
  public field = "value";
}

describe("class decorator tests", () => {
  it("should freeze instance of TestClass", () => {
    const i1 = new TestClass();
    expect((i1 as any).createDate).toBeDefined();
  });
});
```

Note, that such decorator can't change typescript class, so we can achieve these additional
fields by casting the object to `any`.

## Property Decorators

Following decorator on class field will overwrite `get` accessor:

```ts
type ObjectKey<T> = keyof T;

export function overwrite<T extends Object>(
  target: T,
  key: string | symbol
): void {
  const objectKey = key as ObjectKey<typeof target>;
  const field = target[objectKey];

  Object.defineProperty(target, objectKey, {
    get: () => "overwritten", // now accessing decorated field will always return `overwritten` value
    set: () => {}, // invoke set now will not make any change to the field
    enumerable: false,
    configurable: false,
  });
}
```


## Method Decorators

This type of decorator can be used only on class methods. It receives target of type `Object` - object, on which this method is defined, key of type `string | symbol`, which is a method name
and descriptor of type `PropertyDescriptor`.

For example, let's create decorator, which will print to console execution time of decorated
method:

```ts
const bench: MethodDecorator = (
  target,
  key,
  descriptor: PropertyDescriptor
) => {
  const original: Function = descriptor.value;
  if (original == null) return descriptor;

  descriptor.value = async function (...args: any[]) {
    console.log(`method ${key.toString()} starting to execute`);

    const start = performance.now();
    const result = await original.call(this, ...args);
    const end = performance.now();

    console.log(`method ${key.toString()} execution time: ${end - start}`);

    return result;
  };

  return descriptor;
};
```

## Decorator Factories

Decorator factory is a function, which receives some arbitrary number of parameters and eventually
returns a decorator:

```ts
function decoratorFactory(value: any) {
  return (target) => {
    // ...
  };
}
```