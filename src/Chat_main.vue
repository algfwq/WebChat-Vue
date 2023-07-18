<script setup>
import { ref, onMounted, onUnmounted,reactive } from 'vue'
import Cookies from 'js-cookie';

//设置深色模式
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

//设置骨架屏
const loading = ref(true)

//骨架屏高度自适应
function autoheight1(id){
  function adjustheight(id) {
    // 获取指定div元素对象
    var divElement = document.getElementById(id);
    divElement.style.height = (window.innerHeight - 20).toString() + "px";
  }
  window.setInterval(function logname() {adjustheight(id)}, 1);
}
autoheight1("sk_aside");
function autoheight2(id){
  function adjustheight(id) {
    // 获取指定div元素对象
    var divElement = document.getElementById(id);
    divElement.style.height = (window.innerHeight - 40).toString() + "px";
  }
  window.setInterval(function logname() {adjustheight(id)}, 1);
}
autoheight2('sk_main');
</script>

<template>
  <!-- 内容骨架屏 -->
  <el-skeleton style="width: 100%" direction="vertical" alignment="flex-start" :loading="loading" animated class="content-skeleton">
    <!-- 骨架屏内容 -->
    <template #template>
      <el-container width="100%">
        <el-aside width="50px"><el-skeleton-item variant="rect" style="width: 100%" id="sk_aside"/></el-aside>
        <el-main><el-skeleton-item variant="rect" style="width: 100%" id="sk_main"/></el-main>
      </el-container>
    </template>
    <!-- 正文 -->
    <template #default>
    </template>
  </el-skeleton>
</template>

<style scoped>
.el-container {
  height: 100%;
}
</style>