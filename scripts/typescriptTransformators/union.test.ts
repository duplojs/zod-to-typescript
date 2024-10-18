import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("union", () => {
	const result = ZodTypescriptTransformator.convert(zod.union([zod.string(), zod.number()]));

	expect(result).toMatchSnapshot();
});
