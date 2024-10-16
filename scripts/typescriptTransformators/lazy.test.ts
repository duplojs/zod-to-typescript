import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod, type ZodType } from "zod";

it("lazy", () => {
	const zodSchema: ZodType = zod.object({
		prop1: zod.lazy(() => zodSchema.array()),
	});

	const result = ZodTypescriptTransformator.convert(zodSchema);

	const expected = "type Zod2ts_0_duplojs = { prop1: Zod2ts_0_duplojs[]; };".replace(/\s+/g, "");
	const received = result.replace(/\s+/g, "");
	expect(received).toBe(expected);
});
