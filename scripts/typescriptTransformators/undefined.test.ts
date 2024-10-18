import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("undefined", () => {
	const result = ZodTypescriptTransformator.convert(zod.undefined());

	expect(result).toMatchSnapshot();
});
