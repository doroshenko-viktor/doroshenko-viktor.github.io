---
title: C# Mongo Bulk Operations
date: "2022-06-21"
description: "Examples of performing mongo bulk requests with C# mongo driver"
---

## Bulk Upsert

To create bulk upsert with C# `MongoDb` driver use following snippet:

```csharp
IList<TMongoDto> mongoDtos = GetMongoDtosList(); // List here to avoid multiple enumeration, but it is not crucial
var bulk = new List<WriteModel<TMongoDto>>(mongoDtos.Count);

foreach (var pretendingDto in mongoDtos)
{
    var filter = Builders<TransientElementDepartureDateMongoDto>.Filter.Where((actual) =>
        actual.Key == pretendingDto.Key // or any other suitable bool expression allowing to identify item, which has to be overwritten
    );

    var upsertModel = new ReplaceOneModel<TransientElementDepartureDateMongoDto>(filter, pretendingDto)
    { 
        IsUpsert = true 
    };

    bulk.Add(upsertModel);
}

await Collection.BulkWriteAsync(bulk, null, cancellationToken);
```
