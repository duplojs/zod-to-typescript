import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("effects", () => {
	const result = ZodTypescriptTransformator.convert(zod.string().transform((val) => val));

	expect(result).toMatchSnapshot();
});
