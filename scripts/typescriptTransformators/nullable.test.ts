import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("nullable", () => {
	const result = ZodToTypescript.convert(zod.string().nullable());

	expect(result).toMatchSnapshot();
});
