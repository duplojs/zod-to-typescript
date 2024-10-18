import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("array", () => {
	const result = ZodTypescriptTransformator.convert(zod.string().array());

	expect(result).toMatchSnapshot();
});
