const path = require("path");
const ExtractCssIntoFile = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "react-resizable",
        asyncChunks: true,
    },
    devServer: {
        client: {
            logging: "none",
        },
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
};
