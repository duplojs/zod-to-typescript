import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("nan", () => {
	const result = ZodToTypescript.convert(zod.nan());

	expect(result).toMatchSnapshot();
});
