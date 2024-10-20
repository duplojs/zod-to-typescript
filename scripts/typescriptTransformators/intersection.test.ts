import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("intersection", () => {
	const result = ZodToTypescript.convert(
		zod.string().and(zod.number()),
	);

	expect(result).toMatchSnapshot();
});
