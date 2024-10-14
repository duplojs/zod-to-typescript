import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("never", () => {
	const result = ZodTypescriptTransformator.convert(zod.never());

	expect(result).toBe("type Zod2ts_1_duplojs = never;");
});
