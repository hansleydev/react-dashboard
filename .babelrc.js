module.exports = (api) => {
  api.cache(true);

  const plugins = [
    [
      "babel-plugin-import",
      {
        libraryName: "@material-ui/core",
        libraryDirectory: "esm",
        camel2DashComponentName: false,
      },
      "@material-ui/core",
    ],
    [
      "babel-plugin-import",
      {
        libraryName: "@material-ui/icons",
        libraryDirectory: "esm",
        camel2DashComponentName: false,
      },
      "@material-ui/icons",
    ],
    [
      "babel-plugin-import",
      {
        libraryName: "@material-ui/core/styles",
        libraryDirectory: "esm",
        camel2DashComponentName: false,
      },
      "@material-ui/core/styles",
    ],
    [
      "babel-plugin-import",
      {
        libraryName: "@material-ui/styles",
        libraryDirectory: "esm",
        camel2DashComponentName: false,
      },
      "@material-ui/styles",
    ],
    [
      "babel-plugin-import",
      {
        libraryName: "@material-ui/lab",
        libraryDirectory: "esm",
        camel2DashComponentName: false,
      },
      "@material-ui/lab",
    ],
  ];

  const presets = ["@babel/preset-env", "@babel/preset-react"];

  return {
    presets,
    plugins,
  };
};
