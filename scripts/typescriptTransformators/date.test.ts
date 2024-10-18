import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("Date", () => {
	const result = ZodTypescriptTransformator.convert(zod.date());

	expect(result).toMatchSnapshot();
});
