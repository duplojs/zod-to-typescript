import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("never", () => {
	const result = ZodTypescriptTransformator.convert(zod.never());

	expect(result).toMatchSnapshot();
});
