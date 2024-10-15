import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("function", () => {
	const result = ZodTypescriptTransformator.convert(
		zod.function().args(zod.string())
			.returns(zod.number()),
	);

	expect(result).toBe("type Zod2ts_0_duplojs = (args_0: string, ...rest: unknown[]) => number;");
});
