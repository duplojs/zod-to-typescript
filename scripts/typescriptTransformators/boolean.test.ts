import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("boolean", () => {
	const result = ZodToTypescript.convert(zod.boolean());

	expect(result).toMatchSnapshot();
});
