import tsParser from "@typescript-eslint/parser";

export default [
  {
    languageOptions: {
      parser: tsParser, // ✅ Forma correta no Flat Config
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
