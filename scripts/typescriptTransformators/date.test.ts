import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("Date", () => {
	const result = ZodTypescriptTransformator.convert(zod.date());

	expect(result).toBe("type Zod2ts_1_duplojs = Date;");
});
