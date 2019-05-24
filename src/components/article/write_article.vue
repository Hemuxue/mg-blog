<template>
  <div class="write-article">
    <div class="form">
      <el-form :model="articleForm" :rules="rules" ref="articleForm" label-width="100px" class="demo-articleForm">
        <el-form-item label="文章名称" prop="name" style="maxWidth:300px">
          <el-input v-model="articleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="type">
          <el-select v-model="articleForm.type" placeholder="请选择文章分类">
            <el-option v-for="item of typeList" :key="item.type" :label="item.type" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" prop="tag">
          <el-select v-model="articleForm.tag" placeholder="请选择文章标签">
            <el-option v-for="item of tagList" :key="item.tag" :label="item.tag" :value="item.tag"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章编辑" prop="write">
          <editor
            @getContent="getContent"
            :isGetContent="isGetContent"
            class="editor">
          </editor>
        </el-form-item>
        <el-form-item>
          <el-button tags="primary" @click="submitForm(articleForm)">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import editor from 'base/editor/editor'
export default {
  components:{
    editor,
  },
  data(){
    return {
      //当要回去编辑器的值的时候，改为true
      isGetContent: false,
      articleForm: {
        name: '',
        type: '',
        tag: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        tag: [
          { required: true, message: '请选择文章标签', trigger: 'change' }
        ],
        write:[
          { required: true, message: '请填写文章内容', trigger: 'blur'}
        ]

      },
      tagList: [],
      typeList: [],
      submitData: {}

    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.getData()
  },
  methods: {
    getContent(data){
      const content = data
      const tag_id = this.tagList.filter(item => item.tag == this.submitData.tag)[0].id
      const type_id = this.typeList.filter(item => item.type == this.submitData.type)[0].id
      Axios.post('/api/createBlog', {
        title:this.submitData.name,
        type: this.submitData.type,
        tag: this.submitData.tag,
        content: content,
        tag_id: tag_id,
        type_id: type_id
      }).then((data) => {
        if(data.data.code === 200 && data.data.status === 'success') {
          this.$message.success('创建成功');
          setTimeout(() => {
            this.$router.push({path: 'articleList'})
          },1000)
        }
      })
    },
    submitForm(data){
      if(data.name && data.type && data.tag) {
      }else {
        this.$message.error('请填写完整的数据');
        return
      }
      this.submitData = data;
      this.isGetContent = true
    },
    getData() {
      Axios.get('/api/getAllTags').then(data => {
        this.tagList = [];
        let temp = data.data;
        if(temp.code === 200 && temp.status === 'success') {
          temp.data.forEach( (item) => {
            this.tagList.push({
              id: item.id,
              tag: item.tag
            });
          })
        }
      })
      Axios.get('/api/getAllType').then(data => {
        this.typeList = [];
        let temp = data.data;
        if(temp.code === 200 && temp.status === 'success') {
          temp.data.forEach( (item) => {
            this.typeList.push({
              id: item.id,
              type: item.type
            });
          })
        }
      })
    },


  },
}
</script>
<style lang="less">
.editor {
  max-height: 800px;
  img{
    max-width: 100%;
  }
}
</style>
