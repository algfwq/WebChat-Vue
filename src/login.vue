<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
    //更改网页标题
    const title = ref(data.web_name);
    document.title = title.value;
  }
}
</script>

<template>
  <el-button>奥利给！</el-button>
</template>

<style scoped>
</style>