import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("default", () => {
	const result = ZodToTypescript.convert(
		zod.string().optional()
			.default("duplojs"),
	);

	expect(result).toMatchSnapshot();
});
