import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("record", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.record(zod.number(), zod.string()),
	);

	expect(result).toBe("type Zod2ts_0_duplojs = Record<number, string>;");

	const result1 = ZodTypescriptTransformator.convert(
		zod.record(zod.string()),
	);

	expect(result1).toBe("type Zod2ts_1_duplojs = Record<string, string>;");

	const result2 = ZodTypescriptTransformator.convert(
		zod.record(zod.enum(["toto", "tata"]), zod.string()),
	);

	expect(result2).toBe("type Zod2ts_2_duplojs = Record<\"toto\" | \"tata\", string>;");
});
