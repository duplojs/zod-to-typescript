import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("intersection", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.string().and(zod.number()),
	);

	expect(result).toBe("type Zod2ts_0_duplojs = string & number;");
});
