import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("record", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.record(zod.number(), zod.string()),
	);

	expect(result).toBe("type Zod2ts_0_duplojs = Record<number, string>;");
});
