import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("promise", () => {
	const result = ZodTypescriptTransformator.convert(zod.promise(zod.string()));

	expect(result).toBe("type Zod2ts_0_duplojs = Promise<string>;");
});
