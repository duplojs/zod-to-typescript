import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("function", () => {
	const result = ZodToTypescript.convert(
		zod.function().args(zod.string())
			.returns(zod.number()),
	);

	expect(result).toMatchSnapshot();
});
