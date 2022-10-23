import path from "path";
import { Configuration, DefinePlugin } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const devServer: DevServerConfiguration = {
    port: 3000,
    open: true,
    historyApiFallback: true,
};

const webpackConfig: Configuration = {
    entry: "./client/src/index.tsx",
    ...(process.env.production || !process.env.development
        ? {}
        : { devtool: "eval-source-map" }),

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    },
    output: {
        path: path.join(__dirname, "/build"),
        filename: "build.js",
    },
    module: {
        rules: [
            {
                test: /\.(svg|ico)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
                exclude: /build/,
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer,
    plugins: [
        new HtmlWebpackPlugin({
            // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
            template: "./client/public/index.html",
            favicon: "./client/public/favicon.ico"
        }),
        // DefinePlugin allows you to create global constants which can be configured at compile time
        new DefinePlugin({
            "process.env": process.env.production || !process.env.development,
        }),
    ],
};

export default webpackConfig;
