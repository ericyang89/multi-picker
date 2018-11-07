const config = {
  "presets": [
    "@babel/preset-typescript",
    "@babel/preset-react",
    ["@babel/preset-env", {
      "targets": { "browsers": ["android>4.0", "ios >9.0"] }
      }
    ],
  ],

  "plugins": [
    ["react-hot-loader/babel"],
    ["import", { "libraryName": "antd-mobile", "style": "css" }],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-json-strings",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-logical-assignment-operators",
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-function-bind"
  ]
};

module.exports = config;
