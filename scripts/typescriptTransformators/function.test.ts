import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("function", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.function().args(zod.string())
			.returns(zod.number()),
	);

	expect(result).toMatchSnapshot();
});
