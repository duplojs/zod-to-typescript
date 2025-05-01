import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

describe("record", () => {
	it("<number, string>", () => {
		const result = ZodToTypescript.convert(
			zod.record(zod.number(), zod.string()),
		);

		expect(result).toMatchSnapshot();
	});

	it("<string, string>", () => {
		const result = ZodToTypescript.convert(
			zod.record(zod.string()),
		);

		expect(result).toMatchSnapshot();
	});

	it("<enum, string>", () => {
		const result = ZodToTypescript.convert(
			zod.record(zod.enum(["toto", "tata"]), zod.string()),
		);

		expect(result).toMatchSnapshot();
	});

	it("<string?, string | undefined>", () => {
		const result = ZodToTypescript.convert(
			zod.record(zod.string().optional()),
		);

		expect(result).toMatchSnapshot();
	});
});
