<template>
  <div class="dashboard-container">
    <el-container>
      <el-header>
        <div class="BtnSearch">
          <div class="serachItem">
            <el-input v-model="realName" placeholder="请输入优惠券名称" @keyup.enter.native="searchFn">
              <el-button slot="append" icon="el-icon-search" @click="searchFn" />
            </el-input>
          </div>
          <el-button type="primary" @click="addCoupon">新增</el-button>
        </div>
      </el-header>
      <el-main>
        <el-table
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
          <el-table-column label="优惠券金额" align="center">
            <template slot-scope="scope">
              {{ scope.row.cardMoney }}
            </template>
          </el-table-column>
          <el-table-column label="优惠券内容" align="center">
            <template slot-scope="scope">
              {{ (scope.row.cardTitle) }}
            </template>
          </el-table-column>
          <el-table-column label="开始时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.endTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="有效天数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.limitDay }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cardType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cardStatus == 1 ? '有效':'无效' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" min-width="150" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">设置</el-button>
              <!-- <el-button type="text" size="small" @click="changeFn(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delectFn(scope.row)">降级为用户</el-button> -->
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
            :total="size"
            @current-change="jumpPage"
          />
        </div>
      </el-footer>
    </el-container>

    <addCoupon ref="addCoupon"/>
  </div>
</template>

<script>
import { getAllCouponList } from '@/api/user'
import addCoupon from './commpon/addCoupon'
export default {
  name: 'Dashboard',
  components: {
    addCoupon
  },
  data() {
    return {
      tableData: [],
      realName: '',
      pageSize: 10,
      pageNumber: 1,
      size: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    searchFn() {

    },
    getData() {
      const params = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }
      getAllCouponList(params)
        .then(res => {
          const datas = res.pageInfo.list
          this.size = res.pageInfo.total
          this.tableData = datas
        })
    },
    jumpPage(e) {
      this.pageNumber = e
      this.getData()
    },
    addCoupon() {
      this.$refs.addCoupon.showFn()
    }
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
.BtnSearch{
  min-height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
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
</style>
