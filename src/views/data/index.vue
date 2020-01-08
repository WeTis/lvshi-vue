<template>
  <div class="data">
		<div class="title">总数据</div>
    <div class="topCard">
        <div class="order">
          <div class="left">
              <i class="el-icon-s-order"></i>
          </div>
          <div class="right">
            <div class="nums">
              <span class="num">{{Order}}</span>
              <span class="desc">单</span>
            </div>
            <div class="text">订单数</div>
          </div>
        </div>

        <div class="addUser">
          <div class="left">
              <i class="el-icon-user-solid"></i>
          </div>
          <div class="right">
            <div class="nums">
              <span class="num">{{User}}</span>
              <span class="desc">人</span>
            </div>
            <div class="text">用户</div>
          </div>
        </div>


        <div class="addLawyer">
          <div class="left">
              <i class="el-icon-s-custom"></i>
          </div>
          <div class="right">
            <div class="nums">
              <span class="num">{{Lawyer}}</span>
              <span class="desc">人</span>
            </div>
            <div class="text">律师</div>
          </div>
        </div>

        <div class="numCount">
          <div class="left">
              <i class="el-icon-money"></i>
          </div>
          <div class="right">
            <div class="nums">
              <span class="num">{{Money}}</span>
              <span class="desc">元</span>
            </div>
            <div class="text">成交额</div>
          </div>
        </div>
    </div>
	<div class="title">今日数据</div>
    <div class="topCard">
        <div class="order">
          <div class="left">
              <i class="el-icon-s-order"></i>
          </div>
          <div class="right">
            <div class="nums">
              <span class="num">{{nowOrder}}</span>
              <span class="desc">单</span>
            </div>
            <div class="text">今日订单</div>
          </div>
        </div>

        <div class="addUser">
          <div class="left">
              <i class="el-icon-user-solid"></i>
          </div>
          <div class="right">
            <div class="nums">
              <span class="num">{{nowUser}}</span>
              <span class="desc">人</span>
            </div>
            <div class="text">新增用户</div>
          </div>
        </div>


        <div class="addLawyer">
          <div class="left">
              <i class="el-icon-s-custom"></i>
          </div>
          <div class="right">
            <div class="nums">
              <span class="num">{{nowLawyer}}</span>
              <span class="desc">人</span>
            </div>
            <div class="text">新增律师</div>
          </div>
        </div>

        <div class="numCount">
          <div class="left">
              <i class="el-icon-money"></i>
          </div>
          <div class="right">
            <div class="nums">
              <span class="num">{{nowMoney}}</span>
              <span class="desc">元</span>
            </div>
            <div class="text">成交额</div>
          </div>
        </div>
    </div>
	<!-- 待处理和本周数据 -->
	<div class="twoBox">
		<div class="left">
			<div class="title">待处理数据</div>
			<div class="card lawyer">
				<div class="top">待审核律师</div>
				<div class="content">
					<div class="icon">
						<i class="el-icon-s-custom"></i>
					</div>
					<div class="rightNum">
						{{unlawyerNum}}
					</div>
				</div>
			</div>
			<div class="card order">
				<div class="top">等待律师确认订单</div>
				<div class="content">
					<div class="icon">
						<i class="el-icon-s-order"></i>
					</div>
					<div class="rightNum">
						{{comLaywerOrder}}
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="title">本周数据</div>
			<div class="cardBoxFicx">
				<div class="card order">
				<i class="el-icon-s-order"></i>
				<div class="num">{{weekOrder}}</div>
				<div class="desc">订单数量</div>
			</div>
			<div class="card user">
				<i class="el-icon-user-solid"></i>
				<div class="num">{{weekUser}}</div>
				<div class="desc">新增用户</div>
			</div>
			<div class="card lawyer">
				<i class="el-icon-s-custom"></i>
				<div class="num">{{weekLawyer}}</div>
				<div class="desc">新增律师</div>
			</div>
			<div class="card count">
				<i class="el-icon-money"></i>
				<div class="num">{{weekMoney}}</div>
				<div class="desc">成交额</div>
			</div>
			</div>
			
		</div>
	</div>
  </div>
</template>

<script>
import { getAdminList, manageAdmin,getLawyerList,getOrderList } from '@/api/user'
export default {
  name: 'Dashboard',
  data() {
    return {
			nowTime: null,
			weekStartTime: null,
			weekEndTime: null,
			Lawyer: null,
			User: null,
			Order: null,
			Money: null,
			nowLawyer: null,
			nowUser: null,
			nowOrder: null,
			nowMoney: null,
			weekLawyer: null,
			weekUser: null,
			weekOrder: null,
			weekMoney: null,
			unlawyerNum: null,
			comLaywerOrder: null
		}
	},
	created() {
		this.getDataALL();
		this.setTime();
		this.getData();
		this.getDataWeek();
	},
	methods: {
		getDataALL() {
			let param = {
				pageNumber: 1,
        pageSize: 9999999,
        userType: 3
			};
			// 律师
			getLawyerList(param)
			.then(res => {
				this.Lawyer=  res.pageInfo.total;
			})
			let param2 = {
				pageNumber: 1,
        pageSize: 9999999,
        userType: 1
			}
			// 用户
			getLawyerList(param2)
			.then(res => {
				this.User =  res.pageInfo.total;
			})
			let data = {
        pageNumber: 1,
        pageSize:999999
			}
			// 订单 and 成交额
      getOrderList(data)
        .then(res => {
					this.Order =  res.pageInfo.total;
					let data = res.pageInfo.list;
					let num = 0;
					for(let i = 0; i < data.length; i++){
						if(data[i].orderStatus != 0){
							num = num + data[i].orderMoney;
						}
					}
					this.Money = num/100;
        })
		},
		getData() {
			let param = {
				pageNumber: 1,
        pageSize: 9999999,
        userType: 3,
				createStartDate: this.nowTime,
        createEndData: this.nowTime
			};
			// 律师
			getLawyerList(param)
			.then(res => {
				this.nowLawyer=  res.pageInfo.total;
			})
			let param2 = {
				pageNumber: 1,
        pageSize: 9999999,
        userType: 1,
				createStartDate: this.nowTime,
        createEndData: this.nowTime
			}
			// 用户
			getLawyerList(param2)
			.then(res => {
				this.nowUser =  res.pageInfo.total;
			})
			let data = {
        pageNumber: 1,
        pageSize:999999,
        createStartDate: this.nowTime,
        createEndData: this.nowTime
			}
			// 订单 and 成交额
      getOrderList(data)
        .then(res => {
					this.nowOrder =  res.pageInfo.total;
					let data = res.pageInfo.list;
					let num = 0;
					for(let i = 0; i < data.length; i++){
						if(data[i].orderStatus != 0){
							num = num + data[i].orderMoney;
						}
						
					}
					this.nowMoney = num/100;
        })
		},
		getDataWeek() {
			let param = {
				pageNumber: 1,
        pageSize: 9999999,
        userType: 3,
				createStartDate: this.weekStartTime,
        createEndData: this.weekEndTime
			};
			// 律师
			getLawyerList(param)
			.then(res => {
				this.weekLawyer=  res.pageInfo.total;
			})
			let param2 = {
				pageNumber: 1,
        pageSize: 9999999,
        userType: 1,
				createStartDate: this.weekStartTime,
        createEndData: this.weekEndTime
			}
			// 用户
			getLawyerList(param2)
			.then(res => {
				this.weekUser =  res.pageInfo.total;
			})
			let data = {
        pageNumber: 1,
        pageSize:999999,
        createStartDate: this.weekStartTime,
        createEndData: this.weekEndTime
			}
			// 订单 and 成交额
      getOrderList(data)
        .then(res => {
					this.weekOrder =  res.pageInfo.total;
					let data = res.pageInfo.list;
					let num = 0;
					for(let i = 0; i < data.length; i++){
						if(data[i].orderStatus != 0){
							num = num + data[i].orderMoney;
						}
					}
					this.weekMoney = num/100;
				})
				
			let data1 = {
        pageNumber: 1,
				pageSize:999999,
				userType: 2
			}
			//待审核律师
      getLawyerList(data1)
        .then(res => {
					this.unlawyerNum =  res.pageInfo.total;
				})
			
			let data3 = {
        pageNumber: 1,
				pageSize:999999,
				orderStatus: 2
			}
			// 待审核
      getOrderList(data3)
        .then(res => {
					this.comLaywerOrder =  res.pageInfo.total;
				})
			
		},
		setTime() {
			let date = new Date()
			this.nowTime = this.formatDate(date)
			var now = new Date()
			var nowTime = now.getTime()
			var day = now.getDay()
			var oneDayTime = 24*60*60*1000
			var MondayTime = nowTime - (day - 1) * oneDayTime 	// 显示周一
			var SundayTime = nowTime + (7 - day) * oneDayTime	// 显示周日

			this.weekStartTime = this.formatDate(new Date(MondayTime))
			this.weekEndTime = this.formatDate(new Date(SundayTime))

			console.log(this.nowTime, this.weekStartTime, this.weekEndTime)
		},
	  formatDate(date) {
			var myyear = date.getFullYear()
			var mymonth = date.getMonth() + 1
			var myweekday = date.getDate()
			if (mymonth < 10) {
				mymonth = "0" + mymonth
			}
			if (myweekday < 10) {
				myweekday = "0" + myweekday
			}
			return (myyear + "-" + mymonth + "-" + myweekday)
		}
	}
}
</script>

<style lang="scss" scoped>
.data{
	padding-bottom: 20px;
}
.title{
	padding-left: 20px;
	height: 80px;
	line-height: 80px;
	font-size: 26px;
	font-weight: bold;
	width: 100%;
	box-sizing: border-box;
}
.topCard{
  width: 100%;
  padding-left: 20px;
//   margin-top: 20px;
  box-sizing: border-box; 
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.topCard >div{
  flex: 1;
	min-width: 222px;
	// max-width: 25%;
  height: 150px;
  margin-right: 20px;
	margin-bottom: 20px;
	padding: 0 10px;
	box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
	    align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 8px 4px #d4cdcd;
}
.topCard >div .left{
  flex: 1;
  text-align: center;
  i{
    font-size: 80px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    line-height: 100px;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
  }
}
.topCard >div .right{
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    .nums{
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      .desc{
        font-size: 16px;
        font-weight: bold;
      }
    }
    .text{
      width: 100%;
      margin-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }

}
.topCard .order{
  background-color: #5d9cec;
}
.topCard .addUser{
  background-color: #eb965d;
}
.topCard .addLawyer{
  background-color: #ab73e2;
}
.topCard .numCount{
  background-color: #35c0a3;
}

// 待处理数据
.twoBox{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding-left:20px;
	margin-top: 60px;
}
.twoBox >div{
	flex: 1;
	min-height: 340px;
	margin-right: 20px;
	border-radius: 5px;
    box-shadow: 0 0 8px 4px #d4cdcd;
	background-color: #fff;
	
}
.twoBox .left{
	display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-content: center;
	padding: 0 10px;
	.card{
		flex: 1;
		height: 100%;
		padding: 20px;
		
		box-sizing: border-box;
		margin: 10px;
		height: 220px;
		border-radius: 5px;
		box-shadow: 0 0 8px 4px #d4cdcd;
		color: #fff;
		.top{
			font-size: 24px;
			font-weight: bold;
		}
		.content{
			margin-top: 60px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-content: center;
			i{
				font-size: 80px;
			}
			.rightNum{
				font-size: 60px;
				font-weight: bold;
				height: 80px;
				line-height: 80px;
				position: relative;
				top: -30px;
				left: -30px;
			}
		}
	}
	.lawyer{
		background-color: #35c0a3;
	}
	.order{
		background-color: #fe9083;
	}
}
.twoBox .right{
	display: flex;
    flex-direction: column;
    flex-wrap: wrap;
	padding: 0 10px;
	align-content: baseline;
	// .title{
	// 	height: 50px;
	// 	line-height: 50px;
	// }
	.cardBoxFicx{
		flex: 1;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: center;
		padding-bottom: 46px;
	}
	.card{
		flex: 1;
		text-align: center;
		position: relative;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-content: center;
		justify-content: center;

		i{
			font-size: 60px;
		}
		.num{
			font-size: 30px;
			// min-width: 152px;
			margin: 5px 0;
		}
		.desc{
			font-size: 22px;
		}
	}
	.card::after{
		position: absolute;
		right: 0;
		top: 25%;
		display: block;
		content: '';
		height: 50%;
		width: 1px;
		background-color: #0000003b;
	}
	.order{
		i{
			color: #5d9cec;
		}
	}
	.user{
		i{
			color: #eb965d;
		}
	}
	.lawyer{
		i{
			color: #ab73e2;
		}
	}
	.count{
		i{
			color: #35c0a3;
		}
	}
	.count::after{
		display: none;
	}
}
@media screen and (max-width:1400px){
	.topCard >div{
		height: 120px;
	}
	.topCard >div .left{
		flex: 1;
		text-align: center;
		i{
			font-size: 60px;
			height: 80px;
			width: 80px;
			line-height: 80px;
		}
	}
	.twoBox .left{
		.card{
			width: 100%;
			height: 160px;
			flex: auto;
			.content{
				margin-top: 20px;
				i{
					font-size: 60px;
				}
				.rightNum{
					font-size: 50px;
					font-weight: bold;
					height: 80px;
					line-height: 80px;
					position: relative;
					top: -10px;
					left: -30px;
				}
		}
		}
	}
    .twoBox .right{
		.card{
				width: 50%;
				flex: auto;
				height: 50%;
		}
		.user::after{
			display: none;
		}
	}
}
</style>
