import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

describe("literal", () => {
	it("string", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal("duplojs"));

		expect(result).toBe("type Zod2ts_0_duplojs = \"duplojs\";");
	});

	it("number", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(42));

		expect(result).toBe("type Zod2ts_1_duplojs = 42;");
	});

	it("boolean", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(true));

		expect(result).toBe("type Zod2ts_2_duplojs = true;");
	});

	it("null", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(null));

		expect(result).toBe("type Zod2ts_3_duplojs = null;");
	});

	it("undefined", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(undefined));

		expect(result).toBe("type Zod2ts_4_duplojs = undefined;");
	});

	it("bigint", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(42n));

		expect(result).toBe("type Zod2ts_5_duplojs = 42;");
	});
});
