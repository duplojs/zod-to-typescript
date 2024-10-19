import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("bigint", () => {
	const result = ZodToTypescript.convert(zod.bigint());

	expect(result).toMatchSnapshot();
});
