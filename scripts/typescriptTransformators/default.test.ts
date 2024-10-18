import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("default", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.string().optional()
			.default("duplojs"),
	);

	expect(result).toMatchSnapshot();
});
