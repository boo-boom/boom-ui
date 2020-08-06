# boom-component

[![Build Status](https://travis-ci.com/boo-boom/boom-ui.svg?branch=master)](https://travis-ci.com/boo-boom/boom-ui)

使用 React Hooks 和 typescript，完成的UI组件库

### 安装

~~~javascript
npm install boom-component --save
~~~

### 使用

~~~javascript
// 加载样式
import 'boom-component/dist/index.css'
// 引入组件
import { Button } from 'boom-component'
~~~

### 使用技术栈

* 🔥typescript with React Hooks
* 💧从零搭建react组件库
* ⛑️使用 react-testing-library 进行单元测试
* 📚使用 storybook 本地调试和生成文档页面
* 📚使用 react-doc-gen 自动生成文档
* 📦使用第三方库扩充组件-(react-fontawesome, react-transition-group)
* 🌹使用 sass 完成样式
* 🎉利用 npm publish，husky提交发布前验证，可使用 travis CI/CD 集成进行文档自动生成

### 开发命令

~~~bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~

> 组件库安装的React会与所使用的项目中react重复，所以需要将react移动到webpack.json的devDependencies中，只在开发环境安装。
