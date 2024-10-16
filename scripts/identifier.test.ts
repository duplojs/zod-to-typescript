import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

const expected
= `type Comment = {
    user: User;
    content: string;
};

type Post = {
    title: string;
    content: string;
    date: Date;
    comments: Comment[];
};

type User = {
    userId: number;
    firstname: string;
    lastname: string;
    posts: Post[];
};`;

it("identifier", () => {
	const commentSchema = zod.object({
		user: zod.lazy<any>(() => userSchema),
		content: zod.string(),
	}).identifier("Comment");

	const postSchema = zod.object({
		title: zod.string(),
		content: zod.string(),
		date: zod.coerce.date(),
		comments: commentSchema.array(),
	});

	const userSchema = zod.object({
		userId: zod.number(),
		firstname: zod.string(),
		lastname: zod.string(),
		posts: postSchema.array(),
	});

	const result = ZodTypescriptTransformator
		.convert(
			userSchema,
			{
				name: "User",
				indentifiers: [
					{
						name: "Post",
						zodSchema: postSchema,
					},
				],
			},
		);

	expect(result).toBe(expected);
});
