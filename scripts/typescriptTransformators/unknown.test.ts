import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("unknown", () => {
	const result = ZodToTypescript.convert(zod.unknown());

	expect(result).toMatchSnapshot();
});
