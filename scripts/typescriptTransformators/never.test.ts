import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("never", () => {
	const result = ZodToTypescript.convert(zod.never());

	expect(result).toMatchSnapshot();
});
