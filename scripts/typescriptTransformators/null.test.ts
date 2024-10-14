import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("null", () => {
	const result = ZodTypescriptTransformator.convert(zod.null());

	expect(result).toBe("type Zod2ts_0_duplojs = null;");
});
