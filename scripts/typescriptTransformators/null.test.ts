import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("null", () => {
	const result = ZodToTypescript.convert(zod.null());

	expect(result).toMatchSnapshot();
});
