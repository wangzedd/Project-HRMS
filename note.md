### 模板icon图标实现思路
1.全局注册svg-icon 组件
2.引入目录下所有svg
3.webpack loader打包svg
4.svg-icon引用svg

vue代码中除了NODE_ENV之外，所有的变量必须以VUE_APP_开头

2023.11.29 
permission.js store/user 里面的userInfo能否做成持久化，目前每次刷新页面都要去请求一次getUserInfo