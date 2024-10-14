import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("array", () => {
	const result = ZodTypescriptTransformator.convert(zod.string().array());

	expect(result).toBe("type Zod2ts_0_duplojs = string[];");
});
