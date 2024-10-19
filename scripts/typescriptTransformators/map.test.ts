import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("map", () => {
	const result = ZodToTypescript.convert(
		zod.map(zod.string(), zod.string()),
	);

	expect(result).toMatchSnapshot();
});
