import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("number", () => {
	const result = ZodTypescriptTransformator.convert(zod.number());

	expect(result).toMatchSnapshot();
});
