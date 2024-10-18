import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

describe("tuple", () => {
	it("no rest", () => {
		const result = ZodTypescriptTransformator.convert(zod.tuple([zod.string(), zod.number()]));

		expect(result).toMatchSnapshot();
	});

	it("with rest", () => {
		const result = ZodTypescriptTransformator.convert(zod.tuple([zod.string(), zod.number()]).rest(zod.null()));

		expect(result).toMatchSnapshot();
	});
});
