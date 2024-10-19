import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

describe("tuple", () => {
	it("no rest", () => {
		const result = ZodToTypescript.convert(zod.tuple([zod.string(), zod.number()]));

		expect(result).toMatchSnapshot();
	});

	it("with rest", () => {
		const result = ZodToTypescript.convert(zod.tuple([zod.string(), zod.number()]).rest(zod.null()));

		expect(result).toMatchSnapshot();
	});
});
