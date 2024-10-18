import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("unknown", () => {
	const result = ZodTypescriptTransformator.convert(zod.unknown());

	expect(result).toMatchSnapshot();
});
