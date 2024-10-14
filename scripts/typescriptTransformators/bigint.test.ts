import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("bigint", () => {
	const result = ZodTypescriptTransformator.convert(zod.bigint());

	expect(result).toBe("type Zod2ts_0_duplojs = bigint;");
});
