import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("union", () => {
	const result = ZodToTypescript.convert(zod.union([zod.string(), zod.number()]));

	expect(result).toMatchSnapshot();
});
