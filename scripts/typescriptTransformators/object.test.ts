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
});
