module.exports = {
   extends: "eslint-config-standard",
   root: true,
   parser: "babel-eslint",
   parserOptions: {
     sourceType: "module",
     "new-parens": "off",
     "indent": ["error", 2, {SwitchCase: 0}],
     "arrow-body-style": ["warn", "as-needed"],

     "no-unused-vars": "off",
     "react/jsx-uses-react": "error",
     "react/jsx-uses-vars": "error",
     "react/react-in-jsx-scope": "error",

     "import/first": "off",

     // This rule enforces a comma-first style, such as
     // npm uses. I think it's great, but it can look a bit weird,
     // so we're leaving it off for now (although stock Bones passes
     // the linter with it on). If you decide you want to enforce
     // this rule, change "off" to "error".
     "comma-style": ["off", "first", {
       exceptions: {
         ArrayExpression: true,
         ObjectExpression: true,
       }
     }],
   },
}
