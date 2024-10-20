import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("string", () => {
	const result = ZodToTypescript.convert(zod.string());

	expect(result).toMatchSnapshot();
});
