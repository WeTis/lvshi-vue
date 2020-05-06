<template>
  <div v-if="showBox" class="fixedBox">
    <div class="shadow" />
    <div class="content">
      <div class="title">新增优惠券</div>
      <div class="main">
        <div class="item">
          <div class="name">优惠券金额</div>
          <div class="right">
            <el-input v-model="cardMoney" placeholder="请输入内容" />
          </div>
        </div>
        <div class="item">
          <div class="name">展示内容</div>
          <div class="right">
            <el-input v-model="cardTitle" placeholder="请输入内容" />
          </div>
        </div>
        <div class="item">
          <div class="name">有效天数</div>
          <div class="right">
            <el-input-number v-model="limitDay" :min="1" :max="1000" label="描述文字" @change="handleChange" />
          </div>
        </div>
        <div class="item">
          <div class="name">开始时间</div>
          <div class="right">
            <el-date-picker
              v-model="startTime"
              type="date"
             
              placeholder="选择日期"
            />
          </div>
        </div>
        <div class="item">
          <div class="name">截止时间</div>
          <div class="right">
            <el-date-picker
              v-model="endTime"
              type="date"
              
              placeholder="选择日期"
            />
          </div>
        </div>
        <div class="item">
          <div class="name">优惠券类型</div>
          <div class="right">
            <el-select v-model="cardType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="btns">
        <el-button @click="hideFn">取消</el-button>
        <el-button type="primary" @click="insertCoupon">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { insertCoupon } from '@/api/user'
import qs from 'qs'
export default {
  name: 'AddCoupon',
  data() {
    return {
      cardMoney: '',
      startTime: null,
      endTime: null,
      cardTitle: '',
      cardType: '',
      limitDay: 1,
      type: 1,
      options: [
        {
          value: 1,
          label: '邀请代金券'
        }
      ],
      showBox: false
    }
  },
  created() {

  },
  methods: {
    showFn() {
      this.showBox = true
    },
    hideFn() {
      this.showBox = false
    },
    handleChange() {},
    insertCoupon() {
      if (!this.checkValue()) {
        return false
      }
      console.log(this.startTime, this.limitDay)
      const params = {
        cardMoney: this.cardMoney * 1,
        startTime: this.startTime,
        endTime: this.endTime,
        cardTitle: this.cardTitle,
        cardType: this.cardType,
        limitDay: this.limitDay,
        type: this.type
      }
      insertCoupon(qs.stringify(params))
        .then(res => {
          console.log(res)
        })
    },
    checkValue() {
      if (this.cardMoney.length <= 0) {
        this.$message({
          message: '优惠券金额不能为空',
          type: 'info'
        })
        return false
      }

      if (this.cardTitle.length <= 0) {
        this.$message({
          message: '展示内容不能为空',
          type: 'info'
        })
        return false
      }

      if (!this.startTime) {
        this.$message({
          message: '开始时间不能为空',
          type: 'info'
        })
        return false
      }

      if (!this.endTime) {
        this.$message({
          message: '截至时间不能为空',
          type: 'info'
        })
        return false
      }

      if (!this.cardType) {
        this.$message({
          message: '请选择优惠券类型',
          type: 'info'
        })
        return false
      }

      return true
    }
  }

}
</script>

<style lang="scss" scoped>
.fixedBox{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.fixedBox .shadow{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1;
}
.fixedBox .content{
  width: 500px;
  padding: 0 20px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  z-index: 2;
}
.title{
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.item{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
}
.item .name{
  width: 95px;
  padding-right: 10px;
  text-align: right;
}
.item .right{
  flex: 1;
}
.item .right .el-input{
  width: 100%;
}
.el-input-number{
  width: 100%;
}
.el-select{
  width: 100%;
}
.btns{
  padding: 20px 0;
  text-align: right;
}
</style>
