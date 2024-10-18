import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("enum", () => {
	const result = ZodTypescriptTransformator.convert(zod.enum(["a", "b", "c"]));

	expect(result).toMatchSnapshot();
});
