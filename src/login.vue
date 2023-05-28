<script setup>
import { ref, onMounted, onUnmounted,reactive } from 'vue'

//设置深色模式
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

//全自动高度自适应
function autoheight(id){
  function adjustheight(id) {
    // 获取指定div元素对象
    var divElement = document.getElementById(id);
    divElement.style.height = (document.documentElement.clientHeight * 0.65).toString() + "px";
  }
  window.setInterval(function logname() {adjustheight(id)}, 1);
}
autoheight("main");
autoheight('load')

//设置骨架屏
const loading = ref(true)

//设置页面标题
let login_title = ref("登录 - WebChat")

//设置默认登录模式
const activeName = ref('first')

//设置输入框
let name = ref('')

// 获取当前页面的主机名和端口号
const hostname = window.location.hostname;
const port = 8000;
// 构建WebSocket的URL
const url = ref(`ws://${hostname}:${port}/login_ws/`)

//创建websocket连接后端
var socket = new WebSocket(url.value)
console.log("websocket连接成功！")

//定义断开websocket连接之后的回调函数
socket.onclose = function(evt) {
  console.log("Websocket连接已经关闭！");
};

//定义收到服务器消息之后如何处理
socket.onmessage = function(message){
  //输出消息，方便debug
  console.log(message.data)
  //处理服务器消息为JSON
  var data = JSON.parse(message.data);
  //输出模式
  console.log(data.mode)

  //如果为加载状态
  if(data.mode === "load"){
    //关闭骨架屏
    loading.value = false

    //更改网页标题
    const title = ref(data.web_name);
    document.title = '登录 - ' + title.value;
    login_title.value = '登录 - ' + title.value;
  }
}
</script>

<template>
  <!-- 内容骨架屏 -->
  <el-skeleton style="width: 100%" direction="vertical" alignment="flex-start" :loading="loading" animated class="content-skeleton">
    <!-- 骨架屏内容 -->
    <template #template>
      <div style="text-align: -webkit-center">
        <el-skeleton-item variant="rect" style="width: 30%;margin-top: 8%;" id="load"/>
      </div>
    </template>
    <!-- 正文 -->
    <template #default>
      <div style="text-align: -webkit-center">
        <div class="main" id="main">
          <h1>{{ login_title }}</h1>
          <el-tabs v-model="activeName" style="width:60%">
            <el-tab-pane label="普通用户登录" name="first">
              <el-input v-model="name" placeholder="请输入账号ID/邮箱" clearable />
            </el-tab-pane>
            <el-tab-pane label="机器人账号登录" name="second">Config</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<style scoped>
/* 设置内容区域的毛玻璃 */
.main{
  margin-top: 8%;
	width: 30%;

  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0;
  -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0;
  border-radius: 12px;
  -webkit-border-radius: 12px;
}
</style>