import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("pipeline", () => {
	const result = ZodTypescriptTransformator.convert(zod.string().pipe(zod.number()));

	expect(result).toBe("type Zod2ts_0_duplojs = string;");
});
