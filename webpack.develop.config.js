var path = require("path");
var webpack = require("webpack");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");

module.exports = {
    //从 context 对应的文件夹开始
    context: path.resolve(__dirname, "src"),
    //指定 SPA 应用的入口文件
    entry: {
        app: "./app.js"
    },
    //指定项目的输出文件
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js" //[name]为entry的键
    },
    module: {
        rules: [
            //处理js语法和jsx语法到ES5
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                //use可以是字符串,也可以是数组
                use: [
                    {
                        loader: "babel-loader",
                        /*options: {
                         presets: ["es2015", "react"]
                         }*/ //将配置写在.babelrc文件中
                    }
                ]
            },
            //处理在js中引用css, less, scss文件
            {
                test: /\.css$/,
                use: [
                    "style-loader", "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", "css-loader", "less-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", "css-loader", "sass-loader"
                ]
            },
            //处理图片引用
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    "url-loader"
                ]
            },
            //处理字体引用
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: [
                    "url-loader"
                ]
            }
        ]
    },
    //配置webpack-dev-server服务器
    devServer: {
        contentBase: path.resolve(__dirname, "src"), //服务启动目录
        hot: true, //热更新,必须配置plugins插件
        inline: true, // 默认为true
        port: 8080, //端口号
        host: "localhost", //主机
        historyApiFallback: true,
        noInfo: false,
        //stats: "minimal",
        //publicPath: publicPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //配合热更新使用
        new OpenBrowserPlugin()
    ]

}
