import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("intersection", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.string().and(zod.number()),
	);

	expect(result).toMatchSnapshot();
});
