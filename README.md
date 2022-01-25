# JavaScript Project Setup Instructions
Here are a set of instructions for starting a JavaScript project. 

## Foundational Setup
Your project directory should include the following. 

```
- ./dist
- ./src
.gitignore
```

- `dist` folder
- `src` folder
- `.gitignore` file

### Initialize project
If the package.json and package-lock.json files do not exist, then initialize your project with the following command.

`npm init`

----
## Basic Babel Setup
Install [babel core](https://www.npmjs.com/package/@babel/core) and [babel preset env](https://www.npmjs.com/package/@babel/preset-env)

`npm install --save-dev @babel/core @babel/preset-env`

**For REACT Projects:** Install [Babel React preset](https://babeljs.io/docs/en/babel-preset-react)

`npm install --save-dev @babel/preset-react`

#### Babel Eslint Parser
Install @babel/eslint-parser for eslint parsing

`npm install --save-dev @babel/eslint-parser`


Add babel.config.js for your [Babel Config](https://babeljs.io/docs/en/configuration).

#### Example of a Babel Config for a React Project
```
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

```
### Polyfill Your Project
It's highly recommended to install [core-js](https://www.npmjs.com/package/core-js) and [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) in order to polyfill JavaScript features with Babel. 

`npm install --save core-js regenerator-runtime`

----

## Eslint Setup
Install eslint

`npm install --save-dev eslint`

**For REACT Projects:** Install eslint react plugin

`npm install --save-dev eslint-plugin-react`

Add a .eslintrc.js config file. See [eslint documentation](https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats) for config files.

Example of .eslintrc.js for a React App

```
module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true,
      "jest": true
  },
  // Add Global Variable exceptions
  "globals": {
    "window": true,
    "console": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"

  ],
  "parserOptions": {
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "parser": "@babel/eslint-parser",
  // Toggle Eslint Rules
  "rules": {
      // React Rules
      "react/prop-types": 0,
      "no-sparse-arrays": 0,
      // General Rules
      "no-console": 0,
      "no-unused-vars": 0,
      "no-case-declarations": 0,
      "linebreak-style": [
          "error",
          "unix"
      ],
      "semi": [
          "error",
          "always"
      ]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
```

[See step to install](#babel-eslint-parser) @babel/eslint-parser for babel. 

Add .eslintignore file to the root of project

```
node_modules/*
dist/*
configs/*
```

----

## Webpack Setup

Webpack is a JavaScript bundler. It's the glue for making everything work together, but it can get complex. It's recommended to read the [Webpack guides](https://webpack.js.org/guides/) so you have an understanding of how it works. At the time of writing this webpack is on version 5.


Let's install webpack packages.

`npm install --save-dev webpack webpack-cli webpack-bundle-analyzer`

#### Install basic packages for babel and eslint

`npm install --save-dev babel-loader eslint-webpack-plugin`

#### Install CSS packages for webpack

`npm install --save-dev style-loader css-loader mini-css-extract-plugin cssnano`

#### Install LESS packages for webpack

`npm install --save-dev less less-loader`

#### Install POSTCSS and Autoprepfixer packages for webpack

`npm install --save-dev postcss postcss-loader postcss-preset-env autoprefixer`

### Install Webpack HTML Plugin and the Dev Server ( optional )

`npm install --save-dev html-webpack-plugin webpack-dev-server`

See webpack's docs about the [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

Also read the docs about [Webpack's dev server](https://webpack.js.org/configuration/dev-server/)


### Add build script to the package.json

```
...
"scripts": {

    "build": "npm run build:prod",
    "build:dev": "webpack --mode development --watch --progress --color",
    "build:prod": "webpack --mode production",
    "build:analyze": "USE_ANALYZER=true npm run build:prod",
    "start-dev-server": "webpack serve --open --mode development",
    "start-server": "webpack serve --open --mode production"
}
...

```
- `npm run build` - This will run the production build
- `npm run build:prod` - The same as `npm run build`
- `npm run build:dev` - This will run a dev build and keep webpack in watch mode.
- `npm run build:analyze` - This will run a production build with the build analyzer results. 
- `npm run start-dev-server` - This is an optional build for running the dev server.
- `npm run start-dev-server` - This is an optional build for running the dev server with a production build.

### Add webpack.config.js to the root of the project. 

### Webpack Config for a JavaScript Project without CSS and LESS


```
const webpack = require("webpack");
const path = require("path");

// Webpack Plugins
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Package.json Info
const appName = require("./package.json").name;
const appTitle = require("./package.json").description;
const version = require("./package.json").version;

// Variables
const useAnalyzer = (process.env.USE_ANALYZER && process.env.USE_ANALYZER.toLowerCase() == "true") === true;

module.exports = (env, options) => {
  const { mode } = env;

  const config = {
    entry: {
      [appName]: [path.resolve(__dirname, "./src/index.js")]
    },
    output: {
      path: path.resolve(__dirname, `dist/v${version}/`),
      filename: "[name].js"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        }
      ]
    },
    plugins: []
  };

  if (useAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  config.plugins.push(new ESLintPlugin({
    // See options - https://github.com/webpack-contrib/eslint-webpack-plugin#options
    fix: true, // auto fix
    exclude: "node_modules",
    context: "src",
    extensions: ["js"],
  }));

  // Environment Vars - See https://webpack.js.org/plugins/environment-plugin/
  config.plugins.push(new webpack.EnvironmentPlugin({
    // Include custom environment variables
  }));

  // If HtmlWebpackPlugin is included push to plugins
  config.plugins.push(new HtmlWebpackPlugin({
    title: appTitle,
    template: "index.html"
  }));

  // Development
  if (mode === "development") {
    config.devtool = "inline-source-map";
  }

  // Production 
  if (mode === "production") {
    // Production only config changes here
  }

  return config;
};
```

### Webpack Config for a JavaScript Project with CSS and LESS

```
const webpack = require("webpack");
const path = require("path");

// Webpack Plugins
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Package.json Info
const appName = require("./package.json").name;
const appTitle = require("./package.json").description;
const version = require("./package.json").version;

// Variables
const useAnalyzer = (process.env.USE_ANALYZER && process.env.USE_ANALYZER.toLowerCase() == "true") === true;

module.exports = (env, options) => {
  const { mode } = env;

  const config = {
    entry: {
      [appName]: [path.resolve(__dirname, "./src/index.js")]
    },
    output: {
      path: path.resolve(__dirname, `dist/v${version}/`),
      filename: "[name].js"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        { 
          test: /\.less$/, // .less and .css
          use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-preset-env",
                        {
                          // Options
                          'overrideBrowserslist': ['last 2 versions']
                        },
                      ],
                      require('cssnano')({
                        preset: 'default',
                      })
                    ],
                  }
                }
              },
              'less-loader'
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        }
      ]
    },
    plugins: []
  };

  if (useAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  config.plugins.push(new ESLintPlugin({
    // See options - https://github.com/webpack-contrib/eslint-webpack-plugin#options
    fix: true, // auto fix
    exclude: "node_modules",
    context: "src",
    extensions: ["js"],
  }));

  // Environment Vars - See https://webpack.js.org/plugins/environment-plugin/
  config.plugins.push(new webpack.EnvironmentPlugin({
    // Include custom environment variables
  }));

  // If HtmlWebpackPlugin is included push to plugins
  config.plugins.push(new HtmlWebpackPlugin({
    title: appTitle,
    template: "index.html"
  }));


  // CSS File Build
  config.plugins.push(new MiniCssExtractPlugin({
    filename: `${appName}.main.min.css`,
    ignoreOrder: false
  }));

  // Development
  if (mode === "development") {
    config.devtool = "inline-source-map";
  }

  // Production 
  if (mode === "production") {
    // Production only config changes here
  }

  return config;
};
```

The Project directory should resemble the following
```
- ./node_modules ( ignored by git )
- ./dist
- ./src
.eslintrc.js
.eslintignore
.gitignore
babel.config.js
index.html ( optional - HtmlWebpackPlugin template )
package.json
package-lock.json
webpack.config.js
```

----

## React Projects For World Vision US
Install React dependencies

`npm install --save react react-dom prop-types`

### Install World Vision Custom packages

#### Install swing

`npm install --save git+ssh://git@github.com/wvus-ibu/swing`

#### Install slide

`npm install --save git+ssh://git@github.com/wvus-ibu/slide`
#### Install WVUS Forms

`npm install --save git+ssh://git@github.com/wvus-ibu/wvus-forms#v5.0.0`

#### Install Client Logger

`npm install --save git+ssh://git@github.com/wvus-ibu/wvus-client-logger`

#### Install Services Client 

`npm install --save git+ssh://git@github.com/wvus-ibu/wvus-ist-client-integrations`

#### Install Fusion Services Client

`npm install --save git+ssh://git@github.com/wvus-ibu/client-fusion-integrations`


----

## Prettier

Install [prettier](https://prettier.io/)

`npm install --save-dev --save-exact prettier`

Add .prettier.json and .prettierignore to project

**.prettier.json**
```
{
  "tabWidth": 2,
  "semi": true,
  "quoteProps": "preserve",
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "printWidth": 120,
  "useTabs": false
}
```

**.prettierignore**
```
# Ignore artifacts:
build
coverage
dist
node_modules
webpack.config.js
assets

# Ignore all HTML files:
*.html
```


Add pretier script and update to build script to package.json.

```
"script": {
  "build": "npm run build:prod && npm run pretty",
  ... other scripts
  "pretty": "npx prettier --write src/**/*.js"
}
```

Running `npm run build` will both build the project and run prettier against the code. 

If prettier conflicts with eslint, then consider installing [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation)

## Migrating from Legacy Project To Current

If you are on an older version of babel and webpack. The list below can help determine what you need to do. 

When updating to the latest npm package, sometimes it's cleaner to uninstall the npm package with the same name and re-install it again. The tool [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) can be used to see a list of the latest versions of the npm dependencies. If you are going to use `npm-check-updates`, then manually update the packages individually instead of automatically upgrading all packages.

### Babel Replacements
- replace `babel-core` with `@babel/core`
- replace `babel-preset-env` and `babel-preset-stage-2` with `@babel/preset-env`
- replace `babel-preset-react` with `@babel/preset-react`
- replace `babel-polyfill` and `babel-plugin-transform-class-properties` with `core-js` and `regenerator-runtime`
- replace the existing config file `.babelrc` with `babel.config.js`. See example of [bable.config.js](#example-of-a-babel-config-for-a-react-project).

### eslint
- update to latest `eslint`
- install to latest `@babel/eslint-parser`
- install to latest `eslint-plugin-react`
	

### update tooling
- update to latest `less`
- update to latest `postcss`
- update to latest `autoprefixer`
- update to latest `prettier`


### webpack Replacements
- update to `webpack` 5+
- update to latest `webpack-cli`
- update to latest `webpack-bundle-analyzer`
- update to latest `webpack-dev-server`
- update to latest `html-webpack-plugin`
- update to latest `babel-loader`
- update to latest `style-loader`
- update to latest `css-loader`
- update to latest `mini-css-extract-plugin` ( also add config if separate file bundle needed )
- update to latest `less-loader`
- update to latest `postcss-preset-env`
- replace cssmin with cssnano
- replace `eslint-loader` with `eslint-webpack-plugin` ( See config )
- update to latest `file-loader` or ( remove and use webpack out of the box `type: 'asset/resource'` ) 


### Use newer config. 
- Keep in mind of the plugins that being used. 
- Do not use the prettier-webpack-plugin ( install use prettier separately from webpack - See prettier section )
- Make webpack-bundle-analyzer plugin conditional based on an environment variable USE_ANALYZER instead of using it with every build.
- Try to be consistent with the bundle filename. The newer config use the name from the package.json, but it that doesn't work, then hard code the `appName` variable.
- If you app needs to output css as a separate bundle file, then use the mini-css-extract-plugin. If not, then do not include the MiniCssExtractPlugin.loader to the module rules config.
- See [this resource](https://webpack.js.org/migrate/5/) if there are more advance migration configuration to consider.

See new config example [Webpack Config for a JavaScript Project with CSS and LESS](#webpack-config-for-a-javaScript-project-with-css-and-less)



## Project Test Setup
Coming Soon...

