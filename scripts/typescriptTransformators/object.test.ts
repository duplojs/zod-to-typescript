import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("object", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.object({
			name: zod.string(),
			age: zod.number(),
		}),
	);

	const expected = "type Zod2ts_0_duplojs = { name: string; age: number;};".replace(/\s+/g, "");
	const received = result.replace(/\s+/g, "");
	expect(received).toBe(expected);
});
