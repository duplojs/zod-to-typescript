import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("void", () => {
	const result = ZodTypescriptTransformator.convert(zod.void());

	expect(result).toMatchSnapshot();
});
