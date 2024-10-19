import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("brand", () => {
	const result = ZodToTypescript.convert(zod.string().brand());

	expect(result).toMatchSnapshot();
});
