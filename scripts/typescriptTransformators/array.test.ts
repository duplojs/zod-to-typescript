import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("array", () => {
	const result = ZodToTypescript.convert(zod.string().array());

	expect(result).toMatchSnapshot();
});
