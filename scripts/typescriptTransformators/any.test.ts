import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("any", () => {
	const result = ZodToTypescript.convert(zod.any());

	expect(result).toMatchSnapshot();
});
