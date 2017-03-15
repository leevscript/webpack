var path = require("path")
var webpack = require("webpack")
var CleanPlugin = require("clean-webpack-plugin") //清除插件
var HTMLPlugin = require("html-webpack-plugin") //自动生成HTML插件
var ExtractTextPlugin = require("extract-text-webpack-plugin") //提取样式插件

module.exports = {
    //从 context 对应的文件夹开始
    context: path.resolve(__dirname, "src"),
    //指定 SPA 应用的入口文件
    entry: {
        app: "./app.js",
        venders: ["react", "react-dom", "react-router"]
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
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!postcss-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!less-loader!postcss-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader!postcss-loader"
                })
            },
            //处理图片引用
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    "url-loader?limit=25000&name=images/[name].[ext]" //将图片提取出来放入指定文件,如果超出限制再提取,否则就使用base64代码,大小单位bytes
                ]
            },
            //处理字体引用
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: [
                    "url-loader?limit=100000&name=fonts/[name].[ext]"
                ]
            }
        ]
    },
    plugins: [
        //删除文件,参数为要删除文件集合
        new CleanPlugin(["dist"]),
        //自动生成HTML
        new HTMLPlugin({
            template: "./template.html", //复制的模板文件
            htmlWebpackPlugin: {
                files: {
                    css: ["app.css"],
                    js: ["app.js", "venders.js"]
                }
            },
            minify: {
                removeComments: true, //删除注释
                collapseWhitespace: true, //删除多余换行空格
                removeAttributeQuotes: true
            }
        }),
        //抽取样式,参数为抽取样式的名称
        new ExtractTextPlugin("app.css"),
        //分离第三方js代码,webpack内置插件
        new webpack.optimize.CommonsChunkPlugin({
            name: "venders",
            filename: "venders.js"
        }),
        //混淆压缩js代码,webpack内置插件
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: { //混淆代码
                screw_ie8: true,
                keep_fname: true
            },
            compress: { //压缩代码
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
        //定义成产环境,在node环境再次优化代码,删除警告信息,webpack内置插件
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),

    ]
}

