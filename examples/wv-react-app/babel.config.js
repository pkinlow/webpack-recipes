module.exports = function (api) {
  api.cache(true);

  const presets = [
    ["@babel/preset-env",
    {
      "targets": {
        "browsers": [
          "defaults",
          "not IE <= 11",
          "maintained node versions"
        ]
      },
      "useBuiltIns": "usage",
      "corejs": {
        "version": "3",
        "proposals": true
      }
    }],
    "@babel/preset-react"
  ];

  const plugins = [];

  return {
    presets,
    plugins
  };
}