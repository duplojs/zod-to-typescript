import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("any", () => {
	const result = ZodTypescriptTransformator.convert(zod.any());

	expect(result).toMatchSnapshot();
});
