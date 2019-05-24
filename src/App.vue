<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      collapsed: false,
    }
  },
  created(){
    const storage = localStorage.userData ? localStorage.userData : sessionStorage.userData;
    this.$store.commit('addUserData',JSON.parse(storage))
  },
  computed:mapState([
    'userData'
  ]),
  methods: {
    ...mapMutations(['addUserData'])
  }
}
</script>

<style lang="less">
  #app{
    background: #f0f2f5;
  }
</style>

</style>
