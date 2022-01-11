const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractCssIntoFile = require("mini-css-extract-plugin");

const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "production",
    entry: "./src/components/ResizableContainer/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "react-resizable",
        libraryTarget: "commonjs2",
        asyncChunks: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/transform-runtime"],
                    },
                },
            },
            {
                test: /.s?css$/,
                exclude: /node_modules/,
                use: [ExtractCssIntoFile.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/,
                exclude: /node_modules/,
                type: "asset/resource",
                generator: {
                    filename: "./static/assets/[hash][ext]",
                },
            },
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new ExtractCssIntoFile({ filename: "static/css/[name].css", chunkFilename: "[id].css" }),
    ],
    target: "node",
    externals: [nodeExternals()],
};
