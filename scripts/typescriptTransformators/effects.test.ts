import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("effects", () => {
	const result = ZodToTypescript.convert(zod.string().transform((val) => val));

	expect(result).toMatchSnapshot();
});
