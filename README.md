## boom-component

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
* 💧渐进式的教学过程，很多章后面都有扩展作业，引导同学们深入学习和掌握知识
* ⛑️使用 react-testing-library 完成单元测试
* 📚使用 storybook 本地调试和生成文档页面
* 📚使用 react-doc-gen 自动生成文档
* 📦使用第三方库扩充组件-(react-fontawesome, react-transition-group)
* 🌹样式（Sass）文件从零开始，掌握大型应用的 CSS 组织方法
* 🎉涉及全部流程，包括最后的 npm publish，husky提交发布前验证，travis CI/CD 集成，发布文档站点等

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
