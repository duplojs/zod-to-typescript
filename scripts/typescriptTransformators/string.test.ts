import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("string", () => {
	const result = ZodTypescriptTransformator.convert(zod.string());

	expect(result).toBe("type Zod2ts_0_duplojs = string;");
});
