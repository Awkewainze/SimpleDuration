import { Duration } from "../src/duration";

describe("duration", () => {
    describe("fromMilliseconds", () => {
        it("should store the value passed to itself", () => {
            expect(Duration.fromMilliseconds(10).toMilliseconds()).toBe(10);
        });
    });
});