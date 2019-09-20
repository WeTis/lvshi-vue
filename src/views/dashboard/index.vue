<template>
  <div class="dashboard-container">
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
      listLoading: true
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
