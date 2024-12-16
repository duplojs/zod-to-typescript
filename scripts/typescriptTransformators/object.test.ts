import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

describe("object", () => {
	it("object", () => {
		const result = ZodToTypescript.convert(
			zod.object({
				name: zod.string(),
				age: zod.number(),
			}),
		);
		expect(result).toMatchSnapshot();
	});

	it("object with key optional", () => {
		const result = ZodToTypescript.convert(
			zod.object({
				name: zod.string(),
				age: zod.undefined(),
			}),
		);
		expect(result).toMatchSnapshot();
	});

	it("object with union undefined", () => {
		const result = ZodToTypescript.convert(
			zod.object({
				name: zod.string(),
				age: zod.number(),
				optional: zod.union([zod.undefined(), zod.string()]),
			}),
		);

		expect(result).toMatchSnapshot();
	});

	it("good template key", () => {
		const result = ZodToTypescript.convert(
			zod.object({
				"test-1": zod.string(),
				test: zod.string(),
				"test@": zod.string(),
				111: zod.string(),
			}),
		);

		expect(result).toMatchSnapshot();
	});
});
