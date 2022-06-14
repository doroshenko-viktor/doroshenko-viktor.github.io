---
title: AutoFixture In C#
date: "2022-04-10"
description: "AutoFixture testing strategies in C#"
---

## Data Customization

We have a simple model for test:

```csharp
public record TripDto(Guid Id, IEnumerable<CityDto> City, string Price, int Days) { }
public record CityDto(string Name, int Size);
```

Now let's introduce some constraints.

We want to have trips with amount of cities between `1` and `5`, prices between `"5000.5"` and `"9000.5"`,
duration between `3` and `6` days.

`City.Name` must consist of only three capital letters

And say, we would have a `Price` as a string to be able to mitigate precision problems on serialization.

To create customized objects with `Autofixture` we need to create an class, which implements
`ISpecimenBuilder` interface. This class will be executed every time auto-fixture will
need to create new instance of `Entity`. 

```csharp
public class EntityCustomization : ISpecimenBuilder
{
    protected readonly Random Rand;

    protected AbstractCustomization(Random rand)
    {
        Rand = rand;
    }

    public object Create(object request, ISpecimenContext context)
    {
        if (request is not Type type || type != typeof(Entity))
            return new NoSpecimen(); // if a request, sent to our customization is not of type
            // we need to create, return signal, that we don't need to customize on it

        return new Entity(); // if current request is of type Entity, we can return customized instance of it
    }
}
```

Partially this request type check will be on each custom `SpecimenBuilder`. To make some 
generalization, let's create a base abstract class, which will accumulate some common behavior
and add additional randomization logic:

```csharp
public abstract class AbstractCustomization<T> : ISpecimenBuilder where T : notnull
{
    protected readonly Random Rand;

    protected AbstractCustomization(Random rand)
    {
        Rand = rand;
    }

    public object Create(object request, ISpecimenContext context)
    {
        if (request is not Type type || type != typeof(T))
            return new NoSpecimen();

        return Create(context);
    }

    // this method will be executed only in case, when request is required type
    public abstract T Create(ISpecimenContext context);

    // returns string with numeric content
    protected string GetRandomNumberString(double from, double to) => Convert.ToString(
        Rand.NextInt64((long)from, (long)(to - 1)) + Rand.NextDouble());

    // get ASCII char by it's index
    protected char GetRandomASCIIChar(int fromIndex, int toIndex) => (char)Rand.Next(fromIndex, toIndex);

    // get random int in given range
    protected int GetInt(int from, int to) => Rand.Next(from, to);

    // get string of given length from characters between specified indexes
    protected string GenerateString(int asciiIndexFrom, int asciiIndexTo, int length) => Enumerable
        .Repeat(() => GetRandomASCIIChar(asciiIndexFrom, asciiIndexTo), length)
        .Aggregate(new StringBuilder(), (acc, getChar) =>
        {
            acc.Append(getChar());
            return acc;
        })
        .ToString();
}
```

Now create a concrete implementations for two our DTOs:

```csharp
public class TripCustomizations : AbstractCustomization<TripDto>
{
    public TripCustomizations(Random rand) : base(rand) { }

    // generate TripDto object which satisfies required boundaries:
    public override TripDto Create(ISpecimenContext context) => new(
        Id: Guid.NewGuid(),
        // create collection of cities with length between 1 and 5
        Cities: context.CreateMany<CityDto>(GetInt(1, 5)),
        // using methods, defined in abstract class to generate some randomized values
        Price: GetRandomNumberString(5000.5, 9000.5),
        Days: GetInt(3, 6)
    );
}

public class CityCustomization : AbstractCustomization<CityDto>
{
    private readonly HashSet<string> _usedCityNames = new();

    public CityCustomization(Random rand) : base(rand)
    {
    }

    public override CityDto Create(ISpecimenContext context) => new(
        // on city name we have a constraint - it has to be unique and consist of 3 capital latin letters.
        Name: GetUnique3CapitalCharCityName(),
        Size: GetInt(1, 10)
    );

    // to create every time only unique names, we will use hash set, stored as object's private member
    // every time we will need to get new name we will check if it exists in this cash and generate new
    // until we won't have a unique one. having unique name we will add it to cash and then return.
    // there may be more efficient implementation, e.g. using tries, but it is enough for now =)
    private string GetUnique3CapitalCharCityName()
    {
        var cityName = GenerateName();
        while (_usedCityNames.Contains(cityName))
        {
            cityName = GenerateName();
        }
        _usedCityNames.Add(cityName);

        return cityName;

        string GenerateName() => GenerateString(65, 90, 3);
    }
}
```

Now there is only one step remaining - register customizations:

```csharp
var rand = new Random();
var fixture = new Fixture();
fixture.Customizations.Add(new ElementDepartureCustomization(rand));
fixture.Customizations.Add(new ElementPriceCustomization(request.DeparturesAmount, rand));

var tirps = fixture.CreateMany<TripDto>(5);
```


## References

- [Why I stopped worrying about test setups by using AutoFixture](https://timdeschryver.dev/blog/why-i-stopped-worrying-about-test-setups-by-using-autofixture#composite-customizations)
- https://adamstorr.azurewebsites.net/blog/autofixture-generate-specific-format-with-specimen-builders
- http://www.longest.io/2015/03/07/intro-to-specimen-builders-in-autofixture.html