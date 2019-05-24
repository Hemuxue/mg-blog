<template>
  <div id="editor-wrapper">
    <div class="editor"  ref="editor"></div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Editor from 'wangeditor'
let editor;
export default {
  props:{
    content: {
      type:String,
      default:''
    },
    isGetContent: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      contentText: this.content
    }
  },
  computed:mapState([
    'userData'
  ]),
  watch:{
    contentText(){
      this.editor.txt.html(this.contentText)
    },
    isGetContent(data){
      if(data){
        this.getContent()
      }

    }
  },
  created(){
    this.$nextTick( () =>{
      let _this = this;
      editor = new Editor(this.$refs.editor)
      editor.customConfig.uploadImgServer = '/api/upload'
      editor.customConfig.uploadImgHooks = {
        success: function (xhr, editor, result) {
          const data = result.data
          _this.appendContent(`
            <img src="/api/getPic?path=${data.path}" alt="${data.name}"/>
          `)
            // 图片上传并返回结果，图片插入成功之后触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
            // 图片上传出错时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
            // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            var url = result.url
            insertImg(url)

            // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      editor.create()
    })
  },
  methods: {
    getContent(){
      this.$emit('getContent',editor.txt.html())
    },
    appendContent(html) {
      editor.txt.append(html)
    }
  }
}
</script>
<style lang="less">
  .w-e-menu {
    z-index: 101!important;
  }
  .w-e-text-container{
    z-index: 100!important;
    height: auto!important;
    max-height: 600px!important;
    min-height: 400px!important;
    overflow-y: auto;
  }
</style>
