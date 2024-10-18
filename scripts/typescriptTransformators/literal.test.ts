import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

describe("literal", () => {
	it("string", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal("duplojs"));

		expect(result).toMatchSnapshot();
	});

	it("number", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(42));

		expect(result).toMatchSnapshot();
	});

	it("boolean", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(true));

		expect(result).toMatchSnapshot();

		const result2 = ZodTypescriptTransformator.convert(zod.literal(false));

		expect(result2).toMatchSnapshot();
	});

	it("null", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(null));

		expect(result).toMatchSnapshot();
	});

	it("undefined", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(undefined));

		expect(result).toMatchSnapshot();
	});

	it("bigint", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(42n));

		expect(result).toMatchSnapshot();
	});

	it("symbol", () => {
		const result = ZodTypescriptTransformator.convert(zod.literal(Symbol("symbol")));

		expect(result).toMatchSnapshot();
	});

	it("force error", () => {
		const func = () => "duplojs";
		const result = ZodTypescriptTransformator.convert(zod.literal(func as never));

		expect(result).toMatchSnapshot();
	});
});
