import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("pipeline", () => {
	const result = ZodToTypescript.convert(zod.string().pipe(zod.number()));

	expect(result).toMatchSnapshot();
});
