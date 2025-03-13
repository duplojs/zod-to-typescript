<a name="top"></a>

<p align="center">
  <img src="./logo.png" alt="logo" />
</p>
<p align="center">
  <span style="font-size: 24px; font-weight: bold;">Zod To Typescript</span>
</p>
<p align="center">
  <a href='#'>
    <img src='https://img.shields.io/badge/types-TypeScript-blue?logo=typescript&style=plastic' alt='coverage' />
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/coverage-100%25-green?style=plastic" alt="lang">
  </a>
  <a href="https://www.npmjs.com/package/@duplojs/zod-to-typescript">
    <img src="https://img.shields.io/npm/v/@duplojs/zod-to-typescript" alt="lang">
  </a>
</p>

`@duplojs/zod-to-typescript` is a library that converts Zod schemas to TypeScript types.

## Installation

To consume `@duplojs/zod-to-typescript`, you need to install the npm package and zod.
```bash
npm install @duplojs/zod-to-typescript zod
```

## Usage

### 1. Import necessary modules

```ts
import { z as zod } from 'zod';
import { ZodToTypescript } from '@duplojs/zod-to-typescript';
```

### 2. Define Zod schema

Create a Zod schema that you want to convert to TypeScript:
```ts
const schema = zod.object({
  name: zod.string(),
  age: zod.number(),
  isStudent: zod.boolean(),
});
```

### 3. Convert Zod schema to TypeScript type

Use the `convert` method of `ZodToTypescript` to convert the Zod schema to a TypeScript type declaration:
```ts
const options: ConvertOptions = {
    name: "User", // Optional: Specify a name for the TypeScript type
    export: true, // Optional: Export the TypeScript type
};

const tsType = ZodToTypescript.convert(userSchema, options);
```

### 4. Output the TypeScript type

The `convert` method returns a string containing the TypeScript type declaration. You can output this string to a file or use it directly in your code:
```ts
console.log(tsType);
// output:
export type User = {
  name: string;
  age: number;
  isStudent: boolean;
};
```

### 5. Full Example

```ts
import { z as zod } from 'zod';
import { ZodToTypescript } from '@duplojs/zod-to-typescript';

const schema = zod.object({
  name: zod.string(),
  age: zod.number(),
  isStudent: zod.boolean(),
});

const options: ConvertOptions = {
    name: "User",
    export: true,
};

const tsType = ZodToTypescript.convert(schema, options);

console.log(tsType);
// Output: 
export type User = { 
    name: string; 
    age: number; 
    isStudent: boolean; 
};
```

### 6. Using Identifiers

Identifiers allow you to give a name to a schema. You can also use a schema directly as an identifier. This can be useful when you have nested schemas and want to refer to them by name.

```ts
import { ZodToTypescript, ConvertOptions } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";

// Define your schemas
const addressSchema = zod.object({
    street: zod.string(),
    city: zod.string(),
    zipCode: zod.string(),
});

const companySchema = zod.object({
    name: zod.string(),
    address: addressSchema,
}).identifier("Company"); // automatically identifies the schema as "Company"

const employeeSchema = zod.object({
    employeeId: zod.number(),
    name: zod.string(),
    position: zod.string(),
    company: companySchema,
})

// Convert the Employee schema to TypeScript
const options: ConvertOptions = {
    name: "Employee",
    identifiers: [
        {
            name: "Address", // define manually
            zodSchema: addressSchema,
        },
    ],
    export: true,
};

const tsType = ZodToTypescript.convert(employeeSchema, options);

console.log(tsType);
// Output:
export type Address = {
    street: string;
    city: string;
    zipCode: string;
};

export type Company = {
    name: string;
    address: Address;
};

export type Employee = {
    employeeId: number;
    name: string;
    position: string;
    company: Company;
};
```

### 7. Recursive Schemas

Recursive schemas allow you to define schemas that reference themselves. This is useful for defining structures like trees or linked lists. You can use `zod.lazy()` to create recursive schemas.

```ts
import { ZodToTypescript, ConvertOptions } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";

const categorySchema = zod.object({
    name: zod.string(),
    subcategories: zod.lazy(() => categorySchema.array()),
}).identifier("Category");

const tsType = ZodToTypescript.convert(categorySchema, { export: true });

console.log(tsType);
// Output:
export type Category = {
    name: string;
    subcategories: Category[];
};
```

### 8. New instance
You can create instance of `ZodToTypescript` to make an environment types.

```ts
import { ZodToTypescript } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";

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

const ztt = new ZodToTypescript();

ztt.append(commentSchema);
ztt.append(userSchema, "User");
ztt.append(postSchema, "Post");

const tsType = ztt.toString()

console.log(tsType);
// Output:
type Comment = {
    user: User;
    content: string;
};

type User = {
    userId: number;
    firstname: string;
    lastname: string;
    posts: Post[];
};

type Post = {
    title: string;
    content: string;
    date: Date;
    comments: Comment[];
};
```

### 9. Hooks
Converting a Zod schema to TypeScript requires making choices. Should we generate the type based on the schema's output or the type expected by the schema? Zod-to-Typescript has made these choices, but it doesn't impose them on you. Thanks to the hooks, you can choose your use cases.

```ts
import { ZodToTypescript } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";

const zodSchema = zod.object({
    prop1: zod.date(),
    prop2: zod.number(),
});

const tsType = ZodToTypescript.convert(
    zodSchema,
    {
        name: "Schema"
        zodSchemaHooks: [
            (zodSchema, context, output) => output(
                "next",
                zodSchema instanceof ZodNumber && zodSchema._def.coerce
                    ? zod.number().optional()
                    : zodSchema,
            ),
            (zodSchema, context, output) => output(
                "stop",
                zodSchema instanceof ZodDate ? zod.string() : zodSchema,
            ),
        ],
    },
);

console.log(tsType);
// Output:
type Schema = {
    prop1: string;
    prop2?: number | undefined;
};
```

Hooks are functions that intercept the Zod schema before it looks for its transformer. This allows returning another schema instead. The hook must return the result of the output function. output takes a string as its first argument ("next" or "stop"), which indicates whether the hook execution should stop or continue after it. The second argument corresponds to the schema that will be interpreted.

### 10. Override type node
If you want to make a `zodSchema` give a specific result, you can override its `TypeNode`.

```ts
import { ZodToTypescript } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";
import { factory } from "typescript";

const zodSchema = zod.string().overrideTypeNode(
    factory.createTypeReferenceNode(factory.createIdentifier("RegExp")),
);
// or
const zodSchema = zod.string().overrideTypeNode(
    (ts) => ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("RegExp")),
);

const tsType = ZodToTypescript.convert(
    zodSchema,
    {
        name: "MySchema"
    }
);

console.log(tsType);
// Output:
type MySchema = RegExp;
```

### More Examples

For more examples, please check the unit tests for each type in the `tests` directory. The tests provide comprehensive examples of how to use each supported type with `ZodToTypescript`.

## Acknowledgements

I would like to thank [sachinraja](https://github.com/sachinraja) for creating the [zod-to-ts zod](https://github.com/sachinraja/zod-to-ts) package, which served as an inspiration for this project.
