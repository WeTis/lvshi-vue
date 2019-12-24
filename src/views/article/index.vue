<template>
  <div class="dashboard-container">
    <el-button  type="primary" style="width:100%;margin-bottom:30px;" @click="dialogFormVisible = true">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="60"  align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" style="width:px;height:50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column label="标题"  align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="概述"  align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="作者"  align="center">
        <template slot-scope="scope">
          {{ scope.row.createUser }}
        </template>
      </el-table-column>
      <el-table-column label="链接"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addressUrl }}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-on:click="delectFn(scope.row)">删除</el-button>
          <el-button type="text" size="small" v-on:click="updateFn(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
        <el-pagination
          background
          :page-size="pageSize"
          layout="prev, pager, next"
          @current-change="jumpPage"
          :total="size">
        </el-pagination>
    </div>
    
    <el-dialog title="新增/修改文章"  :visible.sync="dialogFormVisible">

      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="文章标题：" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章概述：" prop="content">
            <el-input type="textarea" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="文章链接：" prop="addressUrl">
            <el-input v-model="ruleForm.addressUrl"></el-input>
        </el-form-item>
        <el-form-item label="文章作者：" prop="createUser">
            <el-input v-model="ruleForm.createUser"></el-input>
        </el-form-item>
        <el-form-item label="主图片：" prop="imageUrl">
            <el-upload
            ref="upload"
            action="api/user/uploadOss"
                class="avatar-uploader"
                :show-file-list="false"
                :auto-upload="false"
                :on-success="successIMg"
                :on-error="errorImg"
                :on-change="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit('ruleForm')">立即提交</el-button>
            <el-button @click="cancleAdd">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  
  </div>
</template>

<script>
import { getArticle, delArticle,addArticle,updateArticle} from '@/api/user'
export default {
  name: 'Dashboard',
   data(){
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      userType: 3,
      listLoading: true,
      ruleForm: {
        title: '',
        content: '',
        addressUrl: "",
        createUser: '',
        imageUrl: '',
      },
     rules: {
        title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        content: [
            { required: true, message: '请输入文章概述', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
            ],
        addressUrl: [{ required: true, message: '请输入文章链接', trigger: 'blur' }],
        createUser: [{ required: true, message: '请输入文章作者', trigger: 'blur' }],
        imageUrl: [{ required: true, message: '请上传图片', trigger: 'blur' }],
      },
      dialogFormVisible: false,
      userInfo: '',
      size: 0,
      loading: '',
      articleId: '',
      file: ''
    }
  },
  created(){
    this.getAdminList()
  },
  methods: {
    getAdminList(){
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }

      getArticle(data)
        .then(res => {
          console.log(res);
          this.size = res.pageInfo.total;
          this.tableData = res.pageInfo.list;
          this.listLoading = false;
        })
    },
    jumpPage(e){
      console.log(e);
      this.pageNumber = e;
      this.getAdminList();
    },
    delectFn(info){
      let data = {
        id: info.id,
      };
      this.$confirm('确认删除该文章？',"提示",{
        type: 'warning'
      })
      .then(_ => {

        delArticle(data)
        .then(res => {
          this.$message({
              message: '删除成功',
              type: 'success'
             });
          this.getAdminList();
        })
      })
      .catch(_ => {});

      
    },
    updateFn(info){
        // 设置表格数据
        this.ruleForm.title = info.title;
        this.ruleForm.content = info.content;
        this.ruleForm.imageUrl = info.imageUrl;
        this.ruleForm.addressUrl = info.addressUrl;
        this.ruleForm.createUser = info.createUser;
        this.articleId = info.id;
        this.$nextTick(() => {
            this.dialogFormVisible = true;
        })
      
    },
    cancleAdd(){
        this.dialogFormVisible = false;
        this.ruleForm.title = '';
        this.ruleForm.content = '';
        this.ruleForm.imageUrl = '';
        this.ruleForm.addressUrl = '';
        this.ruleForm.createUser = '';
        this.articleId = '';
        this.file = '';
    },
    updateArticle(imageUrl){
        let data = {
            id: this.articleId,
            title: this.ruleForm.title,
            content: this.ruleForm.content,
            imageUrl: imageUrl,
            addressUrl: this.ruleForm.addressUrl,
            createUser: this.ruleForm.createUser
        };
        // this.$confirm('确认修改该文章？',"提示",{
        //     type: 'warning'
        // })
        // .then(_ => {

            updateArticle(data)
            .then(res => {
                this.loading.close();
                this.cancleAdd();
                this.$message({
                    message: '修改成功',
                    type: 'success'
                    });
                this.getAdminList();
            })
            .catch(_ => {
                this.loading.close();
                this.$message.error('修改失败，请重新提交');
            });
        // })
        
    },
     handleAvatarSuccess(file) {
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
        this.file = file;
      },
      successIMg(response, file, fileList){
          console.log(15151)
          if(this.articleId){
               this.updateArticle('https://'+response.url);
          }else{
              // 上传其他数据
                let params = {
                    title: this.ruleForm.title,
                    content: this.ruleForm.content,
                    imageUrl: 'https://'+response.url,
                    addressUrl: this.ruleForm.addressUrl,
                    createUser: this.ruleForm.createUser
                }
                addArticle(params)
                .then(res => {
                    this.loading.close();
                    this.cancleAdd();
                    this.pageNumber = 1;
                    this.getAdminList();
                })
                .catch(err => {
                    this.loading.close();
                    this.$message.error('新增失败，请重新提交');
                })
          }
          
      },
      errorImg(){
          this.loading.close();
          this.$message.error('新增失败，请重新提交');
      },
      beforeAvatarUpload(file) {
          console.log(file)
        // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }else{
            this.loading.close();
        }
        return isLt2M;
      },
      submit(formName){
          let title = '创建';
          if(this.articleId){
              title = '修改'
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
               this.$confirm('确认'+title+'文章？',"提示",{
                    type: 'warning'
                })
                .then(_ => {
                    this.loading = this.$loading({
                        lock: true,
                        text: '正在创建',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    // 判断是否是修改文章
                    if(this.articleId){
                        if(this.file){
                            // 上传图片
                            console.log("修改22")
                            this.$refs.upload.submit();
                        }else{
                            // 没有更新图片
                            console.log("修改")
                            this.updateArticle(this.ruleForm.imageUrl );
                        }
                    }else{
                        
                         this.$refs.upload.submit();
                    }
                    
                   
                })
                .catch(_ => {});
            } else {
               
                return false;
            }
         });

        //   this.$refs.upload.submit();
      }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.pages{
  width: 100%;
  margin: 20px 0;
  text-align: right;
}

.el-form .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    // cursor: pointer;
    position: relative;
    overflow: hidden;
}
.el-upload:hover {
    border-color: #409EFF;
}


  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
