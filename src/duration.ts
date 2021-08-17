import { Check } from "@awkewainze/checkverify";

/**
 * Translate times between each other easier for cleaner code. I.e. `Duration.fromMinutes(27).toSeconds();` and for just representing a duration.
 * 
 * !(DANGER) This should not be used with real Dates. Not every day has 24 hours for example, time is weird. This is just a simple abstraction.
 * If you want real time adding on Dates, use [Luxon](https://github.com/moment/luxon).
 *
 * Can be used for simple conversions, I recommend going from bigger to smaller because of floating point errors though i.e. `Duration.fromDays().toSeconds();`
 * I also recommend checking {@link isForever} for unique cases.
 */
export class Duration {
    private constructor(private readonly milliseconds: number, private readonly forever: boolean = false) {
        if (this.forever) {
            this.milliseconds = Number.POSITIVE_INFINITY;
        }
    }
    /**
     * Converts this duration to milliseconds.
     * @returns number of milliseconds representing this duration.
     */
    toMilliseconds(): number {
        Check.verify(!this.forever, "Can't convert forever to milliseconds");
        return this.milliseconds;
    }
    /**
     * Converts this duration to seconds.
     * @returns number of seconds representing this duration.
     */
    toSeconds(): number {
        Check.verify(!this.forever, "Can't convert forever to seconds");
        return this.milliseconds / 1000;
    }
    /**
     * Converts this duration to minutes.
     * @returns number of minutes representing this duration.
     */
    toMinutes(): number {
        Check.verify(!this.forever, "Can't convert forever to minutes");
        return this.toSeconds() / 60;
    }
    /**
     * Converts this duration to hours.
     * @returns number of hours representing this duration.
     */
    toHours(): number {
        Check.verify(!this.forever, "Can't convert forever to hours");
        return this.toMinutes() / 60;
    }
    /**
     * Converts this duration to days.
     * @returns number of days representing this duration.
     */
    toDays(): number {
        Check.verify(!this.forever, "Can't convert forever to days");
        return this.toHours() / 24;
    }
    /**
     * Checks if this durations represents forever.
     * @returns if this duration represents forever.
     */
    isForever(): boolean {
        return this.forever;
    }
    /**
     * Creates a new duration with length equal to the sum of this duration and provided duration.
     * @param duration duration to add to this one.
     * @returns the new duration that is the sum of this duration and duration in parameter.
     */
    add(duration: Duration): Duration {
        Check.verifyNotNullOrUndefined(duration);
        Check.verify(duration instanceof Duration);
        return new Duration(this.milliseconds + duration.toMilliseconds(), this.forever || duration.forever);
    }
    /**
     * Creates a new duration that is equal to this duration multiplied by provided number.
     * @param times times to multiple this duration by.
     * @returns the new duration that is the multiplication of this duration and number in parameter.
     */
    multiply(times: number): Duration {
        Check.verifyPositive(times);
        return new Duration(this.milliseconds * times, this.forever);
    }
    /**
     * Creates a new duration from provided milliseconds.
     * @param milliseconds milliseconds to convert into new duration.
     * @returns newly created duration.
     */
    static fromMilliseconds(milliseconds: number): Duration {
        Check.verifyNotNegative(milliseconds, "Duration must be positive");
        return new Duration(milliseconds);
    }
    /**
     * Creates a new duration from provided seconds.
     * @param seconds seconds to convert into new duration.
     * @returns newly created duration.
     */
    static fromSeconds(seconds: number): Duration {
        Check.verifyNotNegative(seconds, "Duration must be positive");
        return new Duration(seconds * 1000);
    }
    /**
     * Creates a new duration from provided minutes.
     * @param minutes minutes to convert into new duration.
     * @returns newly created duration.
     */
    static fromMinutes(minutes: number): Duration {
        Check.verifyNotNegative(minutes, "Duration must be positive");
        return this.fromSeconds(minutes * 60);
    }
    /**
     * Creates a new duration from provided hours.
     * @param hours hours to convert into new duration.
     * @returns newly created duration.
     */
    static fromHours(hours: number): Duration {
        Check.verifyNotNegative(hours, "Duration must be positive");
        return this.fromMinutes(hours * 60);
    }
    /**
     * Creates a new duration from provided days.
     * @param days days to convert into new duration.
     * @returns newly created duration.
     */
    static fromDays(days: number): Duration {
        Check.verifyNotNegative(days, "Duration must be positive");
        return this.fromHours(days * 24);
    }
    /**
     * Creates a duration representing forever.
     * @returns a new duration representing forever.
     */
    static forever(): Duration {
        return new Duration(Number.MAX_VALUE, true);
    }
    /**
     * Creates a new duration between two durations.
     * @param a a duration.
     * @param b another duration.
     * @returns a new duration between a and b.
     */
    static between(a: Duration, b: Duration): Duration {
        Check.verifyNotNullOrUndefined(a);
        Check.verifyNotNullOrUndefined(b);
        Check.verify(a instanceof Duration);
        Check.verify(b instanceof Duration);
        if (a.isForever() && b.isForever()) return Duration.forever();

        const left = a.isForever() ? Number.MAX_VALUE : a.toMilliseconds();
        const right = b.isForever() ? Number.MAX_VALUE : b.toMilliseconds();

        if (left < right) {
            return Duration.fromMilliseconds(this.randInt(right - left) + left);
        }
        if (right < left) {
            return Duration.fromMilliseconds(this.randInt(left - right) + right);
        }

        return a;
    }

    private static randInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
}