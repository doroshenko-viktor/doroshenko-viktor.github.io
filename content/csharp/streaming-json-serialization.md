---
title: Efficient Serialization Of Large Object Into JSON
date: "2022-06-14"
description: "Serialization and deserialization of large object into JSON using streams"
---

When you need to serialize large objects there may occur problems with memory allocation, heavy
large object heap allocation which creates additional load on garbage collection and in some cases
to throwing of `OutOfMemoryException`.

Using `Newtonsoft.Json` package it is possible to serialize/deserialize large objects without loading
whole data into memory.

Let's consider an example. We have an object of simple structure:

```csharp
public readonly record struct StreamedObject(Guid Id, string Value);
```

And we have a large stream of such an objects with unknown length. It may be `gRPC`, simple iterator,
making calls to external api or generated data. This objects eventually must be serialized
into single `JSON` string and saved into file. To achieve this without a need to load all objects
into memory in `Newtonsoft.Json` there is an overload of `Serialize` method of `JsonSerializer`,
allowing to write data into stream as it appears:

```csharp
public void Serialize(JsonWriter jsonWriter, object? value);
```

Let's create a method, which will receive a stream and enumeration of our objects.
This method will serialize objects by the way these objects appear directly into given stream:

```csharp
void WriteJsonToStream(Stream stream, IEnumerable<StreamedObject> objects)
{
    using var utcStreamWriter = new StreamWriter(stream); // create a UTF-8 encoded stream
    using var jsonWriter = new JsonTextWriter(utcStreamWriter); // create JsonWriter of Newtonsoft.Json

    var serializer = new JsonSerializer();
    serializer.Serialize(jsonWriter, objects);
}
```

In preference it is handy to convert it into an extension method of `Stream`:

```csharp
public static class StreamExtensions
{
    public static void WriteJsonToStream<T>(this Stream stream, IEnumerable<T> objects)
    {
        using var utcStreamWriter = new StreamWriter(stream);
        using var jsonWriter = new JsonTextWriter(utcStreamWriter);

        var serializer = new JsonSerializer();
        serializer.Serialize(jsonWriter, objects);
    }
}
```

Now we can use this extension on some particular example:

```csharp
var fixture = new Fixture();
var objects = fixture.CreateMany<StreamedObject>(200); // create an enumeration of objects with length 200
using var file = File.Create("test.json"); // create a file in local file system and get a stream,
// allowing to write into this file

file.WriteJsonToStream(objects); // serializing generated objects into file stream
```

As we created an extension over simple stream, we are not limited with only `FileStream`.
We can use it with any stream we may need:

```csharp
//..
var memoryStream = new MemoryStream();
memoryStream.WriteJsonToStream(objects);
```