import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("map", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.map(zod.string(), zod.string()),
	);

	expect(result).toMatchSnapshot();
});
