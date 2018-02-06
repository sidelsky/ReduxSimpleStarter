// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// module.exports = {
//   plugins: [
//     // your custom plugins
//   ],
//   module: {
//     rules: [
//       // add your custom rules.
//     ],
//   },
// };

const path = require("path");
const babelConfig = require("../config/babelConfig");
const paths = require("../config/paths");

// Extends default Storybook webpack config
// See: https://storybook.js.org/configurations/custom-webpack-config/
module.exports = {
    module: {
        strictExportPresence: true,
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        loaders: ["style-loader", "css-loader"]
                    },
                    {
                        test: /\.svg$/,
                        loaders: ["raw-loader"]
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: [paths.appSrc],
                        loader: require.resolve("babel-loader"),
                        options: Object.assign(
                            {
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true
                            },
                            babelConfig
                        )
                    },
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            limit: 10000,
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    },
                    {
                        // Exclude `js` files to keep "css" loader working as it injects
                        // it's runtime that would otherwise processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        loader: require.resolve("file-loader"),
                        options: {
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "oos-core": path.resolve(__dirname, "../src/core"),
            "oos-storybook": path.resolve(__dirname, "../src/stories/shared"),
            oos: path.resolve(__dirname, "../src/modules")
        }
    }
};
