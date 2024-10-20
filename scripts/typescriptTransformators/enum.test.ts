import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("enum", () => {
	const result = ZodToTypescript.convert(zod.enum(["a", "b", "c"]));

	expect(result).toMatchSnapshot();
});
