import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("string", () => {
	const result = ZodTypescriptTransformator.convert(zod.string());

	expect(result).toMatchSnapshot();
});
