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
            element-loading-text="Loading"
             height="100%"
            :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900,backgroundColor: '#bfbaba',}"
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
            <el-table-column label="图文价格"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.photoPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话价格"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.lawyerPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.telephone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="地址"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userAddress ?  (scope.row.userAddress).split('$T$')[0] : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column label="资格证书号"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userAddress ? (scope.row.userAddress).split('$T$')[1] : ''}}</span>
            </template>
          </el-table-column>
            <el-table-column label="关键字"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userLabel }}</span>
              </template>
            </el-table-column>
            <el-table-column label="执业经历"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.workExperience }}</span>
              </template>
            </el-table-column>
            <el-table-column label="简介" show-overflow-tooltip  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.selfData }}</span>
              </template>
            </el-table-column>
            <el-table-column label="擅长"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.goodAt }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="180" prop="created_at" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" v-on:click="setSuFn(scope.row)">通过</el-button>
                <el-button type="text" size="small" v-on:click="changeFn(scope.row)">修改</el-button>
                <el-button type="text" size="small" v-on:click="delectFn(scope.row)">切换为用户</el-button>
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
    

 

    <!--  -->
    <el-dialog title="设置抽成方式" :visible.sync="dialogFormVisible">

      
      <el-form :model="form">
        <el-form-item label="抽成方式" >
          <el-radio v-model="form.radio" label="1">按照比例</el-radio>
          <el-radio v-model="form.radio" label="2">抽出/每次</el-radio>
        </el-form-item>
        <el-form-item v-if="form.radio == 2" label="抽出金额/每次" >
          <el-input v-model="form.percentageOne" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.radio == 1" label="抽出比例(%)" >
          <!-- <el-input v-model="form.lawyerPercentage" autocomplete="off"></el-input> -->
          <!-- <el-slider v-model="form.lawyerPercentage"></el-slider> -->
        
            <span class="demonstration" style="padding-left: 10px; color:red;">{{form.lawyerPercentage}}%</span>
            <el-slider v-model="form.lawyerPercentage"></el-slider>
          
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setInfo">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改律师信息 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisibleInfo">

      
      <el-form ref="infoFrom" :model="infoFrom" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="infoFrom.realName"></el-input>
        </el-form-item>
        <el-form-item label="职业律所">
          <el-input v-model="infoFrom.userAddressLS"></el-input>
        </el-form-item>
        <el-form-item label="执业证号">
          <el-input v-model="infoFrom.userAddressNUM"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="infoFrom.telephone"></el-input>
        </el-form-item>
        <el-form-item label="电话价格">
          <el-input v-model="infoFrom.lawyerPrice"></el-input>
        </el-form-item>
        <el-form-item label="图文价格">
          <el-input v-model="infoFrom.photoPrice"></el-input>
        </el-form-item>
        <el-form-item label="主要类目">
          <el-select v-model="infoFrom.type" placeholder="请选择主要类目">
            <el-option label="婚姻家事" value="婚姻家事"></el-option>
            <el-option label="劳动工伤" value="劳动工伤"></el-option>
            <el-option label="交通事故" value="交通事故"></el-option>
            <el-option label="合同纠纷" value="合同纠纷"></el-option>
            <el-option label="民间借贷" value="民间借贷"></el-option>
            <el-option label="知识产权" value="知识产权"></el-option>
            <el-option label="拆迁安置" value="拆迁安置"></el-option>
            <el-option label="税务规划" value="税务规划"></el-option>
            <el-option label="公司业务" value="公司业务"></el-option>
            <el-option label="刑事辩护" value="刑事辩护"></el-option>
            <el-option label="不良资产" value="不良资产"></el-option> 
            <el-option label="数据安全" value="数据安全"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="infoFrom.selfData"></el-input>
        </el-form-item>
        <el-form-item label="擅长">
          <el-input type="textarea" v-model="infoFrom.goodAt"></el-input>
        </el-form-item>
        <el-form-item label="执业经历">
          <el-input type="textarea" v-model="infoFrom.workExperience"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleInfo = false">取 消</el-button>
        <el-button type="primary" @click="changeInfoFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAdminList, changeInfoApi, manageAdmin, getLawyerList, setLaywer } from '@/api/user'
export default {
  name: 'Dashboard',
   data(){
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      userType: 2,
      realNmae: null,
      listLoading: true,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        radio: "1",
        lawyerPercentage: 0,
        percentageOne: 0,
      },
      size: 0,
      dialogFormVisibleInfo: false,
      infoFrom: {
        realName:"",
        userAddressLS:"",
        userAddressNUM:"",
        telephone:"",
        lawyerPrice:"",
        photoPrice:"",
        selfData:"",
        goodAt:"",
        workExperience:"",
        type: "",
        id: ''
      }
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
    setSuFn(info){
      this.dialogFormVisible = true;
      this.userInfo = info;
      
    },
    changeFn(info){
       this.infoFrom = {
          realName: info.realName,
          userAddressLS: info.userAddress ?  (info.userAddress).split('$T$')[0] : '',
          userAddressNUM: info.userAddress ? (info.userAddress).split('$T$')[1] : '',
          telephone: info.telephone,
          lawyerPrice: info.lawyerPrice,
          photoPrice: info.photoPrice,
          selfData: info.selfData,
          goodAt: info.goodAt,
          workExperience: info.workExperience,
          type: info.userLabel,
          id: info.id
      }
      this.dialogFormVisibleInfo = true;
      console.log(this.infoFrom);
    },
    changeInfoFn(){

      if(this.infoFrom.lawyerPrice <= 0 || this.infoFrom.photoPrice <= 0){
        this.$message({
              message: '价格不能小于0',
              type: 'info'
             });
        return false;
      }
      if(this.infoFrom.selfData.length <= 0){
        this.$message({
              message: '简介不能为空',
              type: 'info'
             });
        return false;
      }
      if(this.infoFrom.goodAt.length <= 0){
        this.$message({
              message: '擅长不能为空',
              type: 'info'
             });
        return false;
      }
      if(this.infoFrom.workExperience.length <= 0){
        this.$message({
              message: '执业经历不能为空',
              type: 'info'
             });
        return false;
      }
      if(this.infoFrom.type.length <= 0){
        this.$message({
              message: '主要类目不能为空',
              type: 'info'
             });
        return false;
      }
      if(this.infoFrom.realName.length <= 0){
        this.$message({
              message: '姓名不能为空',
              type: 'info'
             });
        return false;
      }
      if(this.infoFrom.userAddressLS.length <= 0){
        this.$message({
              message: '执业律所不能为空',
              type: 'info'
             });
        return false;
      }
      if(this.infoFrom.userAddressNUM.length <= 0){
        this.$message({
              message: '执业证号不能为空',
              type: 'info'
             });
        return false;
      }
      if(this.infoFrom.telephone.length <= 0){
        this.$message({
              message: '电话不能为空',
              type: 'info'
             });
        return false;
      }
      let data = {
         id: this.infoFrom.id,
         realName: this.infoFrom.realName,
         telephone: this.infoFrom.telephone,
         lawyerPrice: this.infoFrom.lawyerPrice,
         photoPrice: this.infoFrom.photoPrice,
         selfData: this.infoFrom.selfData,
         goodAt: this.infoFrom.goodAt,
         workExperience: this.infoFrom.workExperience,
         userLabel: this.infoFrom.type,
         userAddress: this.infoFrom.userAddressLS + '$T$'+ this.infoFrom.userAddressNUM,
      };
      this.$confirm('确认修改此律师信息？',"提示",{
        type: 'warning'
      })
      .then(_ => {

        changeInfoApi(data)
        .then(res => {
          this.$message({
              message: '修改成功',
              type: 'success'
             });
          this.dialogFormVisibleInfo= false;
          this.getAdminList();
        })
      })
      .catch(_ => {});
    }, 
    setInfo(){
      let data = {
        userType: 3,
        id: this.userInfo.id,
        percentageType: this.form.radio*1,
        percentageOne: this.form.percentageOne,
        lawyerPercentage: this.form.lawyerPercentage
      };
      this.$confirm('确认通过此律师？',"提示",{
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
        userType:1,
        id: info.id,
      };
      this.$confirm('确认切换该律师为用户？，请谨慎操作',"提示",{
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
