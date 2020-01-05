<template>
  <div class="dashboard-container">
    <el-container>
        <el-header>
          <div class="BtnSearch">
            <div class="serachItem">
              <el-input v-model="realNmae" placeholder="请输入用户名" @keyup.enter.native="searchFn">
                <el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
              </el-input>
              
            </div>
          </div>
        </el-header>
        <el-main>
          <el-table
            v-loading="listLoading"
            :data="tableData"
             height="100%"
            :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900,backgroundColor: '#bfbaba',}"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="ID" width="95">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="头像" width="60"  align="center">
              <template slot-scope="scope">
                <img :src="scope.row.headImage" style="width:px;height:50px;" alt="">
              </template>
            </el-table-column>
            <el-table-column label="微信昵称"  align="center">
              <template slot-scope="scope">
                {{ scope.row.nickname }}
              </template>
            </el-table-column>
            <el-table-column label="姓名"  align="center">
              <template slot-scope="scope">
                {{ scope.row.realName }}
              </template>
            </el-table-column>
            <el-table-column label="电话"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.telephone }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" v-on:click="delectFn(scope.row)">切换为律师</el-button>
                <!-- <el-button type="text" size="small" v-on:click="updateFn(scope.row)">修改密码</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <div class="pages">
              <el-pagination
                background
                :page-size="pageSize"
                layout="prev, pager, next"
                @current-change="jumpPage"
                :total="size">
              </el-pagination>
          </div>
        </el-footer>
     </el-container>
    

 
  
  </div>
</template>

<script>
import { getAdminList, manageAdmin,getLawyerList,setLaywer } from '@/api/user'
export default {
  name: 'Dashboard',
   data(){
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      userType: 1,
      realNmae: null,
      listLoading: true,
      form: {
        name: '',
        region: '',
        radio: "1",
        lawyerPercentage: 0,
        percentageOne: 0,
      },
      dialogFormVisible: false,
      userInfo: '',
      size: 0
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
        userType: this.userType,
        realNmae: this.realNmae
      }

      getLawyerList(data)
        .then(res => {
          console.log(res);
          this.size = res.pageInfo.total;
          this.tableData = res.pageInfo.list;
          this.listLoading = false;
        })
    },
    searchFn(){
      if(!this.realNmae){
        this.realNmae = null;
      }
      this.pageNumber = 1;
      this.size = 0;
      this.getAdminList();
    },
    jumpPage(e){
      console.log(e);
      this.pageNumber = e;
      this.getAdminList();
    },
    setFn(info){
      this.dialogFormVisible = true;
      this.userInfo = info;
      this.form.radio = info.percentageType == 0 ? '1' : info.percentageType.toString();
      this.form.lawyerPercentage =info.lawyerPercentage ;
      this.form.percentageOne = info.percentageOne;
    },
    setInfo(){
      let data = {
        userType: 3,
        id: this.userInfo.id,
        percentageType: this.form.radio*1,
        percentageOne: this.form.percentageOne,
        lawyerPercentage: this.form.lawyerPercentage
      };
      this.$confirm('确认设置？',"提示",{
        type: 'warning'
      })
      .then(_ => {

        setLaywer(data)
        .then(res => {
          this.$message({
              message: '认证通过成功',
              type: 'success'
             });
          this.dialogFormVisible= false;
          this.getAdminList();
        })
      })
      .catch(_ => {});
    },
    delectFn(info){

      let data = {
        userType:2,
        id: info.id,
      };
      this.$confirm('确认切换用户为律师？，请谨慎操作',"提示",{
        type: 'warning'
      })
      .then(_ => {

        setLaywer(data)
        .then(res => {
          this.$message({
              message: '切换成功',
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
.dashboard-container{
  height: 100%;
  min-width: 786px;
}
.el-container{
  width: 100%;
  height: 100%;
}
.el-container .el-header{
  height: auto !important;
}
.el-container .el-main{
  padding: 0 20px;
}
// .dashboard {
//   &-container {
//     margin: 0 30px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
.BtnSearch{
  min-height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.BtnSearch >div{
  margin: 10px 15px;
  height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.BtnSearch >div .name{
  padding-right: 10px;
  color: #909399;
  font-size: 16px;
}
.BtnSearch >div  >.el-select{
  width: 150px;
}
.BtnSearch .el-input{
  width: 500px;
}
.BtnSearch .el-input .el-select{
  width: 120px;
}
.el-range-editor{
  width: 300px;
}
.el-date-editor >>> .el-range-separator {
    padding: 0 5px;
    line-height: 32px;
    width: 20px;
    color: #303133;
}
.pages{
  width: 100%;
  margin-top: 20px;
  text-align: right;
}
</style>
