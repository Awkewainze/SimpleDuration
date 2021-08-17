# SimpleDuration

Translate times between each other easier for cleaner code. I.e. `Duration.fromMinutes(number).toSeconds();` and for just representing a duration.

**This should not be used with real Dates. Not every day has 24 hours for example, time is weird. This is just a simple abstraction.**
If you want real time adding on Dates, use [Luxon](https://github.com/moment/luxon).

Can be used for simple conversions, I recommend going from bigger to smaller or you might have floating point errors i.e. `Duration.fromDays(number).toSeconds();`
I also recommend checking `isForever` for unique cases.
