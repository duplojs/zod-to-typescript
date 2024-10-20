import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("catch", () => {
	const result = ZodToTypescript.convert(zod.string().catch("toto"));

	expect(result).toMatchSnapshot();
});
