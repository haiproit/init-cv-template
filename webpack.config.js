const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        app: path.resolve('resources/js/app.js'),
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    publicPath: '/assets/img/',
                    name: '[name].[ext]?v=[hash]',
                    outputPath: 'img/'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    publicPath: '/assets/fonts/',
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                    options: { minimize: true }
                  }
                ]
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: true,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader', options: {
                            sourceMap: true,
                            config: {
                                ctx: {
                                    mode: 'development'
                                }
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
    },
    externals: {
        window: 'window',
        document: 'document',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'commons',
                    chunks: 'all',
                }
            }
        },
        runtimeChunk: {
            name: "manifest",
        },
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?v=[contenthash:10]'
        }),
    ],
    output: {
        filename: 'js/[name].js?v=[contenthash:10]'
    }
};
