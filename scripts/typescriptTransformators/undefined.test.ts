import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("undefined", () => {
	const result = ZodToTypescript.convert(zod.undefined());

	expect(result).toMatchSnapshot();
});
