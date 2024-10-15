import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("map", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.map(zod.string(), zod.string()),
	);

	expect(result).toBe("type Zod2ts_0_duplojs = Map<string, string>;");
});
