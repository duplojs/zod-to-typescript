import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("optional", () => {
	const result = ZodTypescriptTransformator.convert(zod.string().optional());

	expect(result).toBe("type Zod2ts_0_duplojs = string | undefined;");
});