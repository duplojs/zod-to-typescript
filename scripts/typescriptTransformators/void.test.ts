import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("void", () => {
	const result = ZodToTypescript.convert(zod.void());

	expect(result).toMatchSnapshot();
});
