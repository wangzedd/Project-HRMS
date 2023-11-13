import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

/**
 * Node.js模块加载器API中的功能：扫描目录中的文件
 * require.context(path, useSubdirectories, regExp)
 * @param path 目录路径
 * @param {Boolean} useSubdirectories 是否扫描子目录
 * @param regExp 可选参数，表示用于匹配要加载的模块的正则表达式。默认为空字符串，表示加载所有模块
 */
const req = require.context('./svg', false, /\.svg$/) // obj
// keys() : 获取对象的所有可枚举自身属性名,返回一个数组
// console.log(req.keys()) // ['./404.svg' , './bug.svg' ,...]
const requireAll = requireContext => requireContext.keys().map(requireContext)
// 调用函数
requireAll(req)
// console.log(requireAll(req))
