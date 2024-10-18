import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("bigint", () => {
	const result = ZodTypescriptTransformator.convert(zod.bigint());

	expect(result).toMatchSnapshot();
});
