import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("default", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.string().optional()
			.default("duplojs"),
	);

	expect(result).toBe("type Zod2ts_0_duplojs = string | undefined;");
});
