<template>
  <div class="write-article">
    <div class="form">
      <el-form :model="articleForm" :rules="rules" ref="articleForm" label-width="100px" class="demo-articleForm">
        <el-form-item label="活动名称" prop="name" style="maxWidth:300px">
          <el-input v-model="articleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="classify">
          <el-select v-model="articleForm.classify" placeholder="请选择文章分类">
            <el-option label="分类一" value="分类一"></el-option>
            <el-option label="分类二" value="分类二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章分类" prop="type">
          <el-select v-model="articleForm.type" placeholder="请选择文章标签">
            <el-option label="标签一"   value="标签一"></el-option>
            <el-option label="标签二"  value="标签二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章编辑" prop="write">
          <editor
            @getContent="getContent"
            :isGetContent="isGetContent">
          </editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(articleForm)">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import editor from 'base/editor/editor'
export default {
  components:{
    editor
  },
  data(){
    return {
      text:'',
      //当要回去编辑器的值的时候，改为true
      isGetContent: false,
      articleForm: {
        name: '',
        classify: '',
        type: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
        ],
        classify: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择文章标签', trigger: 'change' }
        ],
        write:[
          { required: true, message: '请填写文章内容', trigger: 'blur'}
        ]

      }

    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    getContent(data){
      this.text = data
    },
    submitForm(data){
      console.log(data)
      this.isGetContent = true
      this.$on('getContent', (d) =>{
        console.log(d)
      })
    }

  },
}
</script>
<style lang="less">
</style>
