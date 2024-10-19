import { ZodToTypescript } from "@scripts/index";
import { z as zod, type ZodType } from "zod";

it("lazy", () => {
	const zodSchema: ZodType = zod.object({
		prop1: zod.lazy(() => zodSchema.array()),
	});

	const result = ZodToTypescript.convert(zodSchema);

	expect(result).toMatchSnapshot();
});
