import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("readonly", () => {
	const result = ZodToTypescript.convert(zod.object({ prop: zod.string() }).readonly());

	expect(result).toMatchSnapshot();
});
