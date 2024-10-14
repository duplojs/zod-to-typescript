import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("boolean", () => {
	const result = ZodTypescriptTransformator.convert(zod.boolean());

	expect(result).toBe("type Zod2ts_1_duplojs = boolean;");
});
