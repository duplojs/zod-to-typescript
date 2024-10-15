import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("nullable", () => {
	const result = ZodTypescriptTransformator.convert(zod.string().nullable());

	expect(result).toBe("type Zod2ts_0_duplojs = string | null;");
});
