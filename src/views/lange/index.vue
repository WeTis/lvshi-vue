<template>
  <div class="dashboard-container">
   <div class="left">
      <div class="name">语言列表 </div>
      <div class="item" v-for="item in list">
				{{item.language}}
				<span>
					<i class="el-icon-edit" @click="editLange(item.id)"></i> 
					<i class="el-icon-delete" @click="delectLange(item.id)"></i>
				</span>
			</div>
   </div>
   <div class="right">
       <div class="name">新增/修改语言</div>
       <div class="content">
           <div class="t">语言名称</div>
           <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
            </el-input>
            <el-button type="primary" @click="addLange">添加语言</el-button>
       </div>
   </div>
  </div>
</template>

<script>
import { getLanguageList, setLanguage } from '@/api/user'
export default {
  name: 'lange',
  data() {
    return {
			input: '',
			list: []
    }
  },
  created() {
    this.getLanguageList();
  },
  methods: {
    getLanguageList() {
			const param = {
				pageSize: 999,
				pageNumber: 1
			}
			getLanguageList(param)
				.then((res) => {
					console.log(res)
					this.list = res.list;
				})
    },
    setLanguage(param, fn) {
      setLanguage(param)
        .then((res) => {
          fn && fn();
        })
		},
		addLange() {
			if(this.input.length > 0){
				let param = {
					type: 1,
					language: this.input
				}
				this.$confirm('确定添加语言?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setLanguage(param,()=>{
						this.$message({
							type: 'success',
							message: '添加成功'
						})
						this.getLanguageList();
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
			}else{
				this.$message({
          message: '请输入语言名称',
          type: 'warning'
        });
			}
		},
		editLange(id){

				this.$prompt('请输入新的名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

        }).then(({ value }) => {
           if(value.length > 0){
							let param = {
								type: 3,
								id: id,
								language: value
							}
							this.$confirm('确定修改语言?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.setLanguage(param,()=>{
									this.$message({
										type: 'success',
										message: '修改成功'
									})
									this.getLanguageList();
								})
							}).catch(() => {
								this.$message({
									type: 'info',
									message: '已取消'
								});          
							});
						}else{
							this.$message({
								message: '请输入语言名称',
								type: 'warning'
							});
						}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
		},
		delectLange(id){
				let param = {
					type: 2,
					id: id
				}
				this.$confirm('确定删除此语言?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setLanguage(param,()=>{
						this.$message({
							type: 'success',
							message: '删除成功'
						})
						this.getLanguageList();
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
		}
  }

}
</script>

<style lang="scss" scoped>
.dashboard-container{
    width: 100%;
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.dashboard-container >.left{
    height: 100%;
    width: 200px;
    padding: 20px;
    margin-right: 40px;
    box-shadow: 0 0 18px 6px #ccc;
}
.name{
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
}
.dashboard-container >.left .item{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 30px;
    align-items: center;
}
.el-icon-delete{
    cursor: pointer;
}
.el-icon-edit{
    cursor: pointer;
    margin-right: 10px;
}
.dashboard-container >.right{
    height: 100%;
    flex: 1;
    padding: 20px;
    box-shadow: 0 0 18px 6px #ccc;
}
.content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}
.content .t{
    // width: 100px;
    padding-right: 20px;
}
.content .el-input{
    flex: 1;
    margin-right: 20px;
}
</style>
