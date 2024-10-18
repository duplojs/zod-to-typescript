import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("nullable", () => {
	const result = ZodTypescriptTransformator.convert(zod.string().nullable());

	expect(result).toMatchSnapshot();
});
