import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodPromise, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodPromise;
	},
	makeTypeNode(zodSchema: ZodPromise<ZodType>, { findTypescriptTransformator }) {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Promise"),
			[findTypescriptTransformator(zodSchema._def.type)],
		);
	},
});
