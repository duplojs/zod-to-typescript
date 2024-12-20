import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("discrimnatedUnion", () => {
	const result = ZodToTypescript.convert(
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
	expect(result).toMatchSnapshot();
});
