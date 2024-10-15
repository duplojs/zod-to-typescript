import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("tuple", () => {
	const result = ZodTypescriptTransformator.convert(zod.tuple([zod.string(), zod.number()]));

	const expected = "type Zod2ts_0_duplojs = [string, number];";
	const received = result.replace(/\s+/g, "");
	expect(received).toBe(expected.replace(/\s+/g, ""));
});
