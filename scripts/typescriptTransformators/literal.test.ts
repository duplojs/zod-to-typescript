import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

describe("literal", () => {
	it("string", () => {
		const result = ZodToTypescript.convert(zod.literal("duplojs"));

		expect(result).toMatchSnapshot();
	});

	it("number", () => {
		const result = ZodToTypescript.convert(zod.literal(42));

		expect(result).toMatchSnapshot();
	});

	it("boolean", () => {
		const result = ZodToTypescript.convert(zod.literal(true));

		expect(result).toMatchSnapshot();

		const result2 = ZodToTypescript.convert(zod.literal(false));

		expect(result2).toMatchSnapshot();
	});

	it("null", () => {
		const result = ZodToTypescript.convert(zod.literal(null));

		expect(result).toMatchSnapshot();
	});

	it("undefined", () => {
		const result = ZodToTypescript.convert(zod.literal(undefined));

		expect(result).toMatchSnapshot();
	});

	it("bigint", () => {
		const result = ZodToTypescript.convert(zod.literal(42n));

		expect(result).toMatchSnapshot();
	});

	it("symbol", () => {
		const result = ZodToTypescript.convert(zod.literal(Symbol("symbol")));

		expect(result).toMatchSnapshot();
	});

	it("force error", () => {
		const func = () => "duplojs";
		const result = ZodToTypescript.convert(zod.literal(func as never));

		expect(result).toMatchSnapshot();
	});
});
