import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("promise", () => {
	const result = ZodTypescriptTransformator.convert(zod.promise(zod.string()));

	expect(result).toMatchSnapshot();
});
