import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("Date", () => {
	const result = ZodToTypescript.convert(zod.date());

	expect(result).toMatchSnapshot();
});
