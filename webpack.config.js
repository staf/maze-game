const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const production = process.env.NODE_ENV === "production";

let plugins = [
    new MiniCssExtractPlugin({filename: "style.css"}),
];

if (production) {
    plugins.concat([
        new OptimizeCSSAssetsPlugin({}),
    ]);
}

module.exports = {
    mode: production ? 'production' : 'development',
    context: __dirname,
    devtool: production ? 'none' : "inline-sourcemap",
    entry: [
        "./src/js/app.js",
        "./src/sass/style.scss"
    ],
    output: {
        path: __dirname + "/public",
        filename: "app.js"
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        noInfo: true
    },
};