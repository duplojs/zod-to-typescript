import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("number", () => {
	const result = ZodTypescriptTransformator.convert(zod.number());

	expect(result).toBe("type Zod2ts_1_duplojs = number;");
});
