const production = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let plugins = [
    new ExtractTextPlugin("style.css")
];

module.exports = {
    context: __dirname,
    devtool: production ? "inline-sourcemap" : null,
    entry: [
        "./src/js/app.js",
        "./src/sass/style.scss"
    ],
    output: {
        path: __dirname + "/public",
        filename: "app.js"
    },
    plugins: production
        ? plugins
        : plugins.concat([
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
        ]),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                loader: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    }
                )
            }
        ]
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        noInfo: true
    },
};