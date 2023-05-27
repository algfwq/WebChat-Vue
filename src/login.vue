<script setup>
import { ref, onMounted, onUnmounted,reactive } from 'vue';

//设置深色模式
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

//设置骨架屏
const loading = ref(true)

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
    let ltitle = ref('登录 - ' + title.value)
  }
}
</script>

<template>
  <!-- 内容骨架屏 -->
  <el-skeleton style="width: 100%" direction="vertical" alignment="flex-start" :loading="loading" animated class="content-skeleton">
    <!-- 骨架屏内容 -->
    <template #template>
      <div style="text-align: -webkit-center">
        <br><br><br><br>
        <el-skeleton-item variant="rect" style="width: 30%;height: 430px"/>
      </div>
    </template>
    <!-- 正文 -->
    <template #default>
      <el-button>奥利给！</el-button>
    </template>
  </el-skeleton>
</template>

<style scoped>

</style>