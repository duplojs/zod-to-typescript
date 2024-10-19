import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("set", () => {
	const result = ZodToTypescript.convert(zod.set(zod.string()));

	expect(result).toMatchSnapshot();
});
