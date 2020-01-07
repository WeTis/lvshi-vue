<template>
  <div class="dashboard-container">
     <el-container>
        <el-header>
          <div class="BtnSearch">
            <div class="serachItem">
              <el-input v-model="searchName" placeholder="请输入内容" @keyup.enter.native="searchFn">
                <el-select v-model="select" slot="prepend"  placeholder="请选择">
                  <el-option label="用户姓名" value=2></el-option>
                  <el-option label="律师姓名" value=1></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
              </el-input>
              
            </div>
            <div class="serachItem">
                <el-button type="primary" @click="downLoad">导出当前数据</el-button>
            </div>
          </div>
          <div class="BtnSearch">
            <div class="serachItem">
              <span class="name">订单状态: </span>
              <el-select v-model="orderStatus" @change="search" placeholder="请选择">
                <el-option
                  v-for="item in orderStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="serachItem">
              <span class="name">订单类型: </span>
              <el-select v-model="orderType" @change="search" placeholder="请选择">
                <el-option
                  v-for="item in orderTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="serachItem">
              <span class="name">咨询类型: </span>
              <el-select v-model="adviceType" @change="search" placeholder="请选择">
                <el-option
                  v-for="item in adviceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="serachItem">
              <span class="name">时间段：</span>
              <el-date-picker
                v-model="value6"
                type="daterange"
                @change="search"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
            <el-table-column label="用户"  align="center">
              <template slot-scope="scope">
                {{ scope.row.adviceUsername }}
              </template>
            </el-table-column>

            <el-table-column label="客户电话"  align="center">
              <template slot-scope="scope">
                {{ scope.row.advicePhone }}
              </template>
            </el-table-column>

            <el-table-column label="律师"  align="center">
              <template slot-scope="scope">
                {{ scope.row.lawyerUsername }}
              </template>
            </el-table-column>
            <el-table-column label="律师电话"  align="center">
              <template slot-scope="scope">
                {{ scope.row.lawyerPhone }}
              </template>
            </el-table-column>
            <el-table-column label="咨询内容"  align="center">
              <template slot-scope="scope">
                {{ scope.row.orderContent }}
              </template>
            </el-table-column>
            <el-table-column label="咨询类型"  align="center">
              <template slot-scope="scope">
                {{ scope.row.adviceType }}
              </template>
            </el-table-column>
            <el-table-column label="订单状态"  align="center">
              <template slot-scope="scope">
                <!-- 0 支付失败  1 已支付（未完成）2 用户确认完成 3 律师确认完成 4 完成 -->
                {{ scope.row.orderStatus == 0 ? '未支付':'' }}
                {{ scope.row.orderStatus == 1 ? '未完成':'' }}
                {{ scope.row.orderStatus == 2 ? '等待律师确认':'' }}
                {{ scope.row.orderStatus == 3 ? '等待用户确认':'' }}
                {{ scope.row.orderStatus == 4 ? '已完成':'' }}
              </template>
            </el-table-column>
            <el-table-column label="订单类型"  align="center">
              <template slot-scope="scope">
                {{ scope.row.orderType == 1 ? '图文咨询':'' }}
                {{ scope.row.orderType == 2 ? '电话咨询':'' }}
                {{ scope.row.orderType == 3 ? '问询台':'' }}
              </template>
            </el-table-column>
            <el-table-column label="订单金额"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.orderMoney / 100 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" >查看详情</el-button>
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
    <!-- -->
    <!-- <div class="table">
      
    </div>
    
     -->
  </div>
</template>

<script>
import { getAdminList, manageAdmin,getOrderList } from '@/api/user'
export default {
  name: 'Dashboard',
   data(){
    return {
      orderStatusOptions: [{
          value: null,
          label: '全部'
        },
         {
          value: 0,
          label: '未支付'
        },
         {
          value: 1,
          label: '未完成'
        }, {
          value: 2,
          label: '等待律师确认'
        }, {
          value: 3,
          label: '等待用户确认'
        }, {
          value: 4,
          label: '已完成'
        }],
      orderStatus: null,
      orderTypeOptions: [{
          value: null,
          label: '全部'
        }, {
          value: 1,
          label: '图文咨询'
        }, {
          value: 2,
          label: '电话咨询'
        },{
          value: 3,
          label: '问询台'
        }],
      orderType: null,
      adviceTypeOptions:[{
          value: null,
          label: '全部'
        }, {
          value: '婚姻',
          label: '婚姻'
        }, {
          value: '继承',
          label: '继承'
        },{
          value: '房产',
          label: '房产'
        },{
          value: '刑事',
          label: '刑事'
        },{
          value: '债务',
          label: '债务'
        },{
          value: '交通事故',
          label: '交通事故'
        },{
          value: '消费者权益',
          label: '消费者权益'
        },{
          value: '知识产权',
          label: '知识产权'
        },{
          value: '收购和并购',
          label: '收购和并购'
        },{
          value: '劳资合同',
          label: '劳资合同'
        },{
          value: '诉讼和仲裁',
          label: '诉讼和仲裁'
        },{
          value: '税务规划',
          label: '税务规划'
        },{
          value: '不良资产',
          label: '不良资产'
        },{
          value: '股权架构和激励',
          label: '股权架构和激励'
        }],
      adviceType: null,
      value6: '',
      createStartDate: null,
      createEndData: null,
      searchName: null,
      userName: null,
      lawyerName: null,
      select: "2",
      tableData: [],
      pageNumber: 1,
      pageSize: 10,   
      listLoading: true,
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
        userName: this.userName,
        lawyerName: this.lawyerName,
        orderStatus: this.orderStatus,
        orderType: this.orderType,
        adviceType: this.adviceType,
        createStartDate: this.createStartDate,
        createEndData: this.createEndData
      }

      getOrderList(data)
        .then(res => {
          console.log(res);
          this.size = res.pageInfo.total;
          this.tableData = res.pageInfo.list;
          this.listLoading = false;
        })
    },
    downLoad(){
      // 
      let xmlResquest = new XMLHttpRequest();
      let data = ""
     if(this.userName){
        data = data + "&userName="+this.userName
      }
      if(this.lawyerName){
        data = data + "&lawyerName="+this.lawyerName
      }
      if(this.orderStatus !== null){
        data = data + "&orderStatus="+this.orderStatus
      }
      if(this.orderType !== null){
        data = data + "&orderType="+this.orderType
      }
      if(this.adviceType !== null){
        data = data + "&adviceType="+this.adviceType
      }
      if(this.createStartDate){
        data = data + "&createStartDate="+this.createStartDate
      }
      if(this.createEndData){
        data = data + "&createEndData="+this.createEndData
      }

      // var x=new XMLHttpRequest();
      //     x.open("GET", "/lawyer/user/exportOrderExcel?"+data, true);
      //     x.responseType = 'blob';
      //     x.onload=function(e){
      //         var url = window.URL.createObjectURL(x.response);
      //         var a = document.createElement('a');
      //         a.href = url;
      //         a.download = '22.xls';
      //         a.click()
      //     }
      //     x.send();
      //  发起请求
      xmlResquest.open("GET", "/lawyer/user/exportOrderExcel?"+data, true);
      // xmlResquest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      // 设置请求头类型
      xmlResquest.setRequestHeader("Content-type", "application/json");
      // xmlResquest.setRequestHeader("pageNumber", 1);
      // xmlResquest.setRequestHeader("pageSize", 999999);
      // xmlResquest.setRequestHeader("userName", this.userName);
      // xmlResquest.setRequestHeader("lawyerName", this.lawyerName);
      // xmlResquest.setRequestHeader("orderStatus", this.orderStatus);
      // xmlResquest.setRequestHeader("orderType", this.orderType);
      // xmlResquest.setRequestHeader("adviceType", this.adviceType);
      // xmlResquest.setRequestHeader("createStartDate", this.createStartDate);
      // xmlResquest.setRequestHeader("createEndData", this.createEndData);
      //  设置请求token

      xmlResquest.responseType = "blob";
      //  返回
      xmlResquest.onload = function(oEvent) {
      let content = xmlResquest.response;
      // 组装a标签
      let elink = document.createElement("a");
      // 设置下载文件名
      elink.download = "订单.xls";
      elink.style.display = "none";
      let blob = new Blob([content]);
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
      };
      xmlResquest.send();
    },
    searchFn(){
      this.orderStatus = null;
      this.orderType = null;
      this.adviceType = null;
      this.createStartDate = null;
      this.createEndData = null;
      if(this.select == 1){
        this.userName = null;
        this.lawyerName = this.searchName;
      }else{
        this.lawyerName = null;
        this.userName = this.searchName;
      }
      this.pageNumber = 1;
      this.size = 0;
      this.getAdminList();
      
    },
    search(){
       this.userName = null;
        this.lawyerName = null;
      if(this.value6){
        let date = this.value6;
        this.createStartDate = date[0];
        this.createEndData = date[1];
      }else{
        this.createStartDate = null;
        this.createEndData = null;
        
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
