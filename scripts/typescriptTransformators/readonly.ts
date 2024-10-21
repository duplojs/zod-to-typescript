import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodReadonly, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodReadonly;
	},
	makeTypeNode(zodSchema: ZodReadonly<ZodType>, { findTypescriptTransformator }) {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Readonly"),
			[findTypescriptTransformator(zodSchema._def.innerType)],
		);
	},
});
