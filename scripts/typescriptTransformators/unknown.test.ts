import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("unknown", () => {
	const result = ZodTypescriptTransformator.convert(zod.unknown());

	expect(result).toBe("type Zod2ts_0_duplojs = unknown;");
});
