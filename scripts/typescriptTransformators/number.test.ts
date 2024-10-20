import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("number", () => {
	const result = ZodToTypescript.convert(zod.number());

	expect(result).toMatchSnapshot();
});
