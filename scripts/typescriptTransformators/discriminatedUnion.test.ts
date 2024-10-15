import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("discrimnatedUnion", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.discriminatedUnion("kind", [
			zod.object({
				kind: zod.literal("a"),
				stringProp: zod.string(),
			}),
			zod.object({
				kind: zod.literal("b"),
				numberProp: zod.number(),
			}),
		]),
	);
	const expected = "type Zod2ts_0_duplojs = { kind: \"a\"; stringProp: string; } | { kind: \"b\"; numberProp: number; };";
	const received = result.replace(/\s+/g, "");
	expect(received).toBe(expected.replace(/\s+/g, ""));
});
