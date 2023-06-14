import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: "**/*.{gql,graphql}",
  schema: "http://localhost:4000/graphql",
  // schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  generates: {
    "graphql/generated/schema.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
