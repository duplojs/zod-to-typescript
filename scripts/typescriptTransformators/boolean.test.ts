import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("boolean", () => {
	const result = ZodTypescriptTransformator.convert(zod.boolean());

	expect(result).toMatchSnapshot();
});
