# react的webpack配置

## 初始项目

npm init

## webpack.config.js

1. webpack
2. webpack-cli

配置webpack.config.js

1. entry
2. output

## 使用babel

### 支持es6

1. babel-loader
2. @babel/core
3. @babel/preset-env

```javascript
//.babelrc
"presets": [
  "@babel/preset-env"
],

//webpack.config.js
module: {
  rules: [
    {
      test: /\.(jsx|js)$/,
      use: {
        loader: "babel-loader",  //es6 babel
      },
      exclude: /node_modules/
    }
  ]
}
```

### 抽离公共辅助函数

问题：Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数,例如实现class效果的_classCallCheck等。  
类似上面的帮助函数 _classCallCheck 可能会重复出现在一些模块里，导致编译后的代码体积变大。

1. @babel/runtime: Babel 为了解决这个问题，提供了单独的包 babel-runtime 供编译模块复用工具函数。
2. @babel/plugin-transform-runtime 用来将原本注入js文件的辅助函数替换成导入语句(即导入babel-runtime中的函数)

```javascript
"plugins": [
  "@babel/plugin-transform-runtime",
]
```

[语法支持](https://www.jianshu.com/p/3b27dfc6785c)

## devServer与热更新

### devServer.publicPath & output.publicPath

[publicPath](https://blog.csdn.net/u012193330/article/details/83310924)

### 热更新

1. devServer.hot: true 开启轮询询问文件是否更新
2. webpack.HotModuleReplacementPlugin 替换更新的模块
3. webpack.NamedModulesPlugin告知更新模块的名字，而不是一个id

```javascript
devServer: {
  port: 3000,
  contentBase: path.resolve(__dirname, './dist'), //指定服务文件
  hot: true, //热更新
},

plugins: [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]

//main.js
if (module.hot) {
  module.hot.accept('./app.js', function() {

  })
}
```

## css

### 提取css成文件

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

plugins: [
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
]

//rules
{
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true
      },
    },
    'css-loader',
  ],
  exclude: /node_modules/
}
```

### css自动添加前缀

1. postcss-loader
2. autoprefixer

```javascript
//rules
{
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
      },
    },
    'css-loader',
    'postcss-loader',
  ],
}

//postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

### css modules

与react css modules配合实现

```javascript
// webpack.config.js
{
  test: /\.(css|less)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
      },
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[local]--[hash:5]'
      }
    },
    'postcss-loader'
  ],
}
```

## html

```javascript
new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
}),
```

## 图片，媒体等资源文件

1. file-loader
2. url-loader

```javascript
{
  test: /\.(jpe?g|png|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 4 * 1024,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]'
          }
        }
      }
    }
  ]
},
{
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:8].[ext]'
          }
        }
      }
    }
  ]
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]'
          }
        }
      }
    }
  ]
},
```

使用的时候(以本地图片资源为例)

```javascript
render() {
  return (
    <div>
      <img src={require('image/bing3.jpg')} />
    </div>
  )
}
```

## react jsx

1. react react-dom
2. @babel-preset-react

### react函数箭头定义

@babel/plugin-proposal-class-properties: 支持react中方法 支持 箭头函数 而不用bind

```javascript
// .babelrc
"plugins": [
  "@babel/plugin-proposal-class-properties",
]
```

### react-css

babel-plugin-react-css-modules: 支持styleName(模块化) className语法

```javascript
// .babelrc
"plugins": [
  [
    "react-css-modules",
    {
      // 需要与css module那里保持一致
      "generateScopedName": "[local]--[hash:5]",
      "webpackHotModuleReloading": true //css热加载
    }
  ],
]
```

### 按需加载antd的css

1. antd
2. babel-plugin-import

```javascript
// .babelrc
"plugins": [
  [
    "import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css" // `style: true` 会加载 less 文件
    }
  ],
]

// 没有插件之前需要这么写
import Button from 'antd/lib/button';
import 'antd/lib/button/style';

// babel-plugin-import 会将下面的代码转成上面的形式
import { Button } from 'antd';
```

这样配置之后理论上是ok的，但是实际上会发现antd的css也会被css-module模块化，也就是加上hash后缀，而html上的class并没有这个hash，最终导致antd的样式没有被正确使用到。  
解决思路：给css模块化限定范围

```javascript
// webpack.config.js
{
  test: /\.(css|less)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
      },
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[local]--[hash:5]'
      }
    },
    'postcss-loader'
  ],
  exclude: /node_modules/
},
{
  // 主要处理antd
  test: /\.(css|less)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
      },
    },
    'css-loader',
    'postcss-loader',
  ],
  include: /node_modules/
}
```

## 优化

### 区分生产、开发环境

### 使用DllPlugin

## 技术栈接入

1. react-router-dom
2. react-redux
3. typescript
4. saga

### react-router-dom

### react-redux

### typescript

### saga

## 实战——电商管理系统

## 业务功能模块

1. 商品管理
2. 订单管理
3. 用户管理

## 核心功能模块

1. 权限系统设计
2. 单点登录
