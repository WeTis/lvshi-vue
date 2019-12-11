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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="账号"  align="center">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="密码"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-on:click="delectFn(scope.row)">删除</el-button>
          <el-button type="text" size="small" v-on:click="updateFn(scope.row)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="新增管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="登录名" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminList, manageAdmin } from '@/api/user'
export default {
  name: 'Dashboard',
   data(){
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      userName: null,
      listLoading: true,
      dialogFormVisible: false,
      form: {
          name: '',
          pass: ''
        },
    }
  },
  created(){
    this.getAdminList()
  },
  methods: {
    getAdminList(){
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userName: this.userName
      }

      getAdminList(data)
        .then(res => {
          console.log(res);
          this.tableData = res.pageInfo.list;
          this.listLoading = false;
        })
    },
    addUser(){
      if(this.form.name.length > 0 && this.form.pass.length > 0){
        let data = {
          type: 1,
          userName: this.form.name,
          password: this.form.pass,
        };
        this.$confirm('确认新增？',"提示",{
          type: 'warning'
        })
        .then(_ => {

          manageAdmin(data)
          .then(res => {
            this.$message({
                message: '新增成功',
                type: 'success'
              });
            this.dialogFormVisible = false;
            this.getAdminList();
          })
        })
        .catch(_ => {});
      }else{
        this.$message({
              message: '请填入完整信息',
              type: 'info'
             });
      }
    },
    delectFn(info){

      let data = {
        type: 2,
        userName: info.userName,
        password: info.password,
        id: info.id,
      };
      this.$confirm('确认删除？',"提示",{
        type: 'warning'
      })
      .then(_ => {

        manageAdmin(data)
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
      this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let data = {
            type: 3,
            userName: info.userName,
            password: value,
            id: info.id,
          };
          this.$confirm('确认修改？',"提示",{
            type: 'warning'
          })
          .then(_ => {

            manageAdmin(data)
            .then(res => {
              this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.getAdminList();
            })
          })
          .catch(_ => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
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
</style>
