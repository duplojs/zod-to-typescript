import { duplojsEslintOpen, duplojsEslintTest } from "@duplojs/eslint";

export default [
	{
		...duplojsEslintTest,
		files: ["**/*.test.ts", "test/**/*.ts"],
		ignores: ["**/*.d.ts"]
	},
	{
		...duplojsEslintOpen,
		files: ["**/*.ts"],
		ignores: ["**/*.test.ts", "test/**/*.ts", "**/*.d.ts"],
	},
	{
		ignores: ["coverage", "dist"]
	}
];