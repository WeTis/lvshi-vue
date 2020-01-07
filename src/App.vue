<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style >
  ::-webkit-scrollbar {
        width: 10px;     
        height: 10px;
    }
::-webkit-scrollbar-thumb {
        border-radius: 4px;
         -webkit-box-shadow: inset 0 0 3px #cbcbd2;
        background: #cbcbd2;
    }
::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 3px #fff;
        background: #fff;
    }
    .el-container .el-main{
    padding: 0 20px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
  }
  .el-container .el-main .el-table{
    height: 100%;
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    width: auto;
  }
</style>
