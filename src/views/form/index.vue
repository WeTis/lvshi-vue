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
              {{ (scope.row.realName) ? (scope.row.realName).split("ZH^")[0] : '' }}
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
              <span>{{ scope.row.userAddress ? ((scope.row.userAddress).split("ZH^")[0] ? ((scope.row.userAddress).split("ZH^")[0]).split('$T$')[0] : "") : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="资格证书号"  align="center">
            <template slot-scope="scope">
              <span>{{  scope.row.userAddress ? ((scope.row.userAddress).split("ZH^")[0] ? ((scope.row.userAddress).split("ZH^")[0]).split('$T$')[1] : "") : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="关键字"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userLabel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="执业经历"  align="center">
            <template slot-scope="scope">
              <span>{{ (scope.row.workExperience) ? (scope.row.workExperience).split("ZH^")[0] : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="简介" show-overflow-tooltip  align="center">
            <template slot-scope="scope">
              <span>{{ (scope.row.selfData) ? (scope.row.selfData).split("ZH^")[0] : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="擅长"  align="center">
            <template slot-scope="scope">
              <span>{{ (scope.row.goodAt) ? (scope.row.goodAt).split("ZH^")[0] : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账户"  align="center">
            <template slot-scope="scope">
              <span>{{ Math.floor(scope.row.lawyerBalance/100*100) /100 }}元</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" min-width="150" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-on:click="setFn(scope.row)">设置</el-button>
              <el-button type="text" size="small" v-on:click="changeFn(scope.row)">修改</el-button>
              <el-button type="text" size="small" v-on:click="delectFn(scope.row)">降级为用户</el-button>
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
    <el-dialog title="修改用户信息" fullscreen :visible.sync="dialogFormVisibleInfo">

      <div class="mainN">
          <el-form ref="infoFrom" :model="infoFrom" label-width="80px" :inline="true">
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
      </div>
      
      <div class="setLange">
        <div class="name">设置语言</div>
          <el-checkbox-group v-model="checkboxGroup1" @change="changeCheck">
            <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
      </div>
      <div class="otherLange" v-for="(item,index) in langeALL">
        <div class="name">{{item.langeName}}信息</div>
        <el-form ref="infoFrom" :model="infoFrom" label-width="80px" :inline="true">
          <el-form-item label="姓名">
            <el-input v-model="item.realName"></el-input>
          </el-form-item>
          <el-form-item label="职业律所">
            <el-input v-model="item.userAddressLS"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="item.selfData"></el-input>
          </el-form-item>
          <el-form-item label="擅长">
            <el-input type="textarea" v-model="item.goodAt"></el-input>
          </el-form-item>
          <el-form-item label="执业经历">
            <el-input type="textarea" v-model="item.workExperience"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleInfo = false">取 消</el-button>
        <el-button type="primary" @click="changeInfoFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminList,changeInfoApi, manageAdmin,getLawyerList,setLaywer, getLanguageList} from '@/api/user'
export default {
  name: 'Dashboard',
   data(){
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      userType: 3,
      realNmae: null,
      listLoading: true,
      citiesALL: [],
      cities: [],
      checkboxGroup1: [],
      form: {
        name: '',
        region: '',
        radio: "1",
        lawyerPercentage: 0,
        percentageOne: 0,
      },
      dialogFormVisible: false,
      userInfo: '',
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
        id: '',
        
      },
      langeItem: {
        realName:"",
        userAddressLS:"",
        userAddressNUM:"",
        selfData:"",
        goodAt:"",
        workExperience:"",
      },
      langeALL: [],
      userInfo: {},
    }
  },
  created(){
    this.getAdminList();
    this.getLanguageList();
  },
  methods: {
    // 根据语言的数量设置
    getLanguageList() {
			const param = {
				pageSize: 999,
				pageNumber: 1
			}
			getLanguageList(param)
				.then((res) => {
					console.log(res)
          let cities = res.list;
          this.citiesALL = res.list;
          let arr = [];
          for(let i =0; i < cities.length; i++){
            arr.push(cities[i].language)
          }
          this.cities = arr;
				})
    },
    setLangeItem(){
      
    },
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
      this.pageNumber = e;
      this.getAdminList();
    },
    getLangeItem(name){
      let citiesALL = this.citiesALL;

      let item = '';
      for(let i = 0; i < citiesALL.length; i++){
        if(name == citiesALL[i].language){
          item = citiesALL[i];
        }
      }
      return item;
    },
    changeCheck(e){
      console.log(e)
      let langeALL = this.langeALL;
      let arr =[];
      for(let i =0; i < e.length; i++){
        let m = e[i];
        let l = 2;
        for(let  y = 0; y < langeALL.length; y++){
          console.log(langeALL[y].langeName,m)
          if(langeALL[y].langeName == m){
            console.log("存在1")
            arr.push(langeALL[y]);
            l = 1;
          }
        }
        if(l == 2){
          // 判断当前新增的是否已经存在
          let langeIds = this.userInfo.languageId ? (this.userInfo.languageId).split(',') : [];
          console.log(langeIds)
          console.log(this.getLangeItem(m).id,m)
          let info = this.userInfo;
          let is = 1;
          let data = {
            
          };
          for(let v = 0;  v < langeIds.length; v++){
            if(this.getLangeItem(m).id == langeIds[v]){
              console.log("存在2")
              let deg =  '$'+this.getLangeItem(m).id+'^';
              data = {
                realName: (info.realName) ? (info.realName).split(deg)[1] : '',
                userAddressLS: info.userAddress ?  ((info.userAddress).split(deg)[1] ? ((info.userAddress).split(deg)[1]).split('$T$')[0]:""): '',
                userAddressNUM: info.userAddress ? ((info.userAddress).split(deg)[1] ? ((info.userAddress).split(deg)[1]).split('$T$')[1]:""): '',
                selfData: (info.selfData) ? (info.selfData).split(deg)[1] : '',
                goodAt: (info.goodAt) ? (info.goodAt).split(deg)[1] : '',
                workExperience: (info.workExperience) ? (info.workExperience).split(deg)[1] : '',
                id: this.getLangeItem(m).id,
                langeName: m
              }
              is = 2;
              break;
            }
          }
          if(is == 1){
            data = {
              realName: '',
              userAddressLS: '',
              userAddressNUM: '',
              selfData: '',
              goodAt: '',
              workExperience: '',
              id: this.getLangeItem(m).id,
              langeName: m
            }
            console.log("存在3")
          }
          
          arr.push(data)
        }
      }
      this.langeALL = arr;
    },
    changeFn(info){
      // 拆分中文
      // ,
       this.userInfo = info;
       this.infoFrom = {
          realName: (info.realName) ? (info.realName).split("ZH^")[0] : '',
          userAddressLS: info.userAddress ?  ((info.userAddress).split("ZH^")[0]).split('$T$')[0] : '',
          userAddressNUM: info.userAddress ? ((info.userAddress).split("ZH^")[0]).split('$T$')[1] : '',
          telephone: info.telephone,
          lawyerPrice: info.lawyerPrice,
          photoPrice: info.photoPrice,
          selfData: info.selfData ? (info.selfData).split("ZH^")[0] : '',
          goodAt: info.goodAt ? (info.goodAt).split("ZH^")[0] : '',
          workExperience: info.workExperience ? (info.workExperience).split("ZH^")[0] : '',
          type: info.userLabel,
          id: info.id
      }
      // 判断当前用户都有哪些语言
      let cities = this.citiesALL;
      let arr = [];
      let arrId = info.languageId ? (info.languageId).split(',') : [];
      
      for(let i = 0; i < cities.length; i++){
        for(let y = 0; y < arrId.length; y++){
          if(cities[i].id == arrId[y]){
            arr.push(cities[i].language);
          }
        }
      }
      this.checkboxGroup1 = arr;
      // 拆分信息 $id^
      // langeALL
      let langeALL = [];
      for(let m = 0; m < arr.length; m++){
        let deg = '$'+this.getLangeItem(arr[m]).id+'^';
        let data = {
          realName: info.realName ? (info.realName).split(deg)[1] : '',
          userAddressLS: info.userAddress ?  ((info.userAddress).split(deg)[1] ? ((info.userAddress).split(deg)[1]).split('$T$')[0]:""): '',
          userAddressNUM: info.userAddress ? ((info.userAddress).split(deg)[1] ? ((info.userAddress).split(deg)[1]).split('$T$')[1]:""): '',
          selfData: (info.selfData) ? (info.selfData).split(deg)[1] : '',
          goodAt: info.goodAt ? (info.goodAt).split(deg)[1] : '',
          workExperience: info.workExperience ? (info.workExperience).split(deg)[1] : '',
          id: this.getLangeItem(arr[m]).id,
          langeName: arr[m]
        }
        langeALL.push(data);
      }
      this.langeALL = langeALL;
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

      // 判断其他语言不能为空
      let langeALL = this.langeALL;
      // console.log(langeALL);
      // let m = 1;
      // for(let i = 0; i < langeALL.length; i++){
      //   let arr = langeALL[i];
      //   if(this.infoFrom.realName.length <= 0){
      //     this.$message({
      //           message: '姓名不能为空',
      //           type: 'info'
      //         });
      //     return false;
      //   }
      //   if(this.infoFrom.userAddressLS.length <= 0){
      //     this.$message({
      //           message: '执业律所不能为空',
      //           type: 'info'
      //         });
      //     return false;
      //   }
      // }
      // if(m == 2){
      //   this.$message({
      //         message: '新增语言信息不能为空',
      //         type: 'info'
      //        });
      //    return false;
      // }
      let languageId = [];
      let checkboxGroup1 = this.checkboxGroup1;
      for(let i = 0; i < checkboxGroup1.length; i++){
        languageId.push(this.getLangeItem(checkboxGroup1[i]).id)
      }
      let data = {
         id: this.infoFrom.id,
         realName: this.infoFrom.realName+"ZH^",
         telephone: this.infoFrom.telephone,
         lawyerPrice: this.infoFrom.lawyerPrice,
         photoPrice: this.infoFrom.photoPrice,
         selfData: this.infoFrom.selfData+"ZH^",
         goodAt: this.infoFrom.goodAt+"ZH^",
         workExperience: this.infoFrom.workExperience+"ZH^",
         userLabel: this.infoFrom.type,
         userAddress: this.infoFrom.userAddressLS + '$T$'+ this.infoFrom.userAddressNUM+"ZH^",
         languageId:  languageId.join(',')
        //  languageId: '1'
      };
      for(let i = 0; i < langeALL.length; i++){
        let deg = '$'+this.getLangeItem(checkboxGroup1[i]).id+'^';
        let info = langeALL[i];
          data.realName = data.realName+deg+(info.realName)+deg,
          data.userAddress = data.userAddress +deg + info.userAddressLS+'$T$'+ info.userAddressNUM+ deg,
          data.selfData = data.selfData + deg + (info.selfData) + deg,
          data.goodAt = data.goodAt + deg + (info.goodAt) + deg,
          data.workExperience = data.workExperience + deg + (info.workExperience) + deg
      }
      // console.log(data);
      // return false;
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
        userType:1,
        id: info.id,
      };
      this.$confirm('确认降级该律师为用户？，请谨慎操作',"提示",{
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
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
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

.el-table{
  height: 100%;
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  width: auto;
}
.pages{
  width: 100%;
  margin-top: 20px;
  text-align: right;
}



.mainN{
  width: 100%;
  padding-top: 20px;
  box-shadow: 0 0 16px 6px #ccc;
}
.otherLange{
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  box-shadow: 0 0 16px 6px #ccc;
}
.otherLange .name{
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  padding-left: 40px;
}
.setLange{
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  box-shadow: 0 0 16px 6px #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 40px;
}
.setLange .name{
  font-weight: bold;
  padding-right: 20px;
}
</style>
