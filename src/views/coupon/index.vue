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
              <span>{{ formatDate(scope.row.startTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" align="center">
            <template slot-scope="scope">
              <span>{{ formatDate(scope.row.endTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="有效天数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.limitDay }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cardType == 1 ? '邀请优惠券' : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cardStatus == 1 ? '有效':'无效' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" min-width="150" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleFn(scope.row.id)">删除</el-button>
              <el-button type="text" size="small" @click="changeFn(scope.row)">修改</el-button>
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

    <addCoupon ref="addCoupon" @close="getData" />
  </div>
</template>

<script>
import { getAllCouponList, insertCoupon } from '@/api/user'
import addCoupon from './commpon/addCoupon'
import qs from 'qs'
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
    },
    changeFn(data) {
      this.$refs.addCoupon.showFn(data)
    },
    /**
     * 删除
     */
    deleFn(id) {
      const params = {
        id: id,
        type: 3
      }
      this.$confirm('此操作将永久删除该优惠券, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        insertCoupon(qs.stringify(params))
          .then(res => {
            if (res.status == 9999) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getData()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    formatDate(dates) {
      const date = new Date(dates)
      var YY = date.getFullYear() + '-'
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      // var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      // var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      // var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return YY + MM + DD
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
