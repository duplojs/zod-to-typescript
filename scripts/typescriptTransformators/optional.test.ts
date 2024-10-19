import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("optional", () => {
	const result = ZodToTypescript.convert(zod.string().optional());

	expect(result).toMatchSnapshot();
});
