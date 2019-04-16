<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      collapsed: false,
    }
  },
}
</script>

<style lang="less">
  #app{
    background: #f0f2f5;
  }
</style>

</style>
