import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("promise", () => {
	const result = ZodToTypescript.convert(zod.promise(zod.string()));

	expect(result).toMatchSnapshot();
});
