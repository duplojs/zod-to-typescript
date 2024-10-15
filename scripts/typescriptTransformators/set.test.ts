import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("set", () => {
	const result = ZodTypescriptTransformator.convert(zod.set(zod.string()));

	expect(result).toBe("type Zod2ts_0_duplojs = Set<string>;");
});
