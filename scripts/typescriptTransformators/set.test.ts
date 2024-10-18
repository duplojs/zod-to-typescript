import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("set", () => {
	const result = ZodTypescriptTransformator.convert(zod.set(zod.string()));

	expect(result).toMatchSnapshot();
});
