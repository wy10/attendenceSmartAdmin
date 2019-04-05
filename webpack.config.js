var path = require('path');


module.exports = {
    entry: './main.js', // 入口文件路径
    output: {
        path: '/',
        filename: 'index.js'
    },
    devServer: {
        hot:true,
        inline: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js?$/, // babel 转换为兼容性的 js 使用es6箭头函数
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=react,prestes[]=es2015,presets[]=stage-0',
                query: {
                    plugins: [
                        ["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
                    ]
            
                }
                
            },
            {   
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.(png|jpg|gif)$/i,
                use:[
                    {loader:'url-loader'}
                ]
            },
            
        ]
    }
}