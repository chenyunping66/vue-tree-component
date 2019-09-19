<template>
  <el-tree :data="allData">
  </el-tree>
</template>
<script>
import _ from 'loadsh'
export default {
  prpos: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      allData: []
    }
  },
  watch: {
    data () {  //需要监控父组件传递的data熟悉，如果有更新就重新渲染
      //数据更新了就需要重新渲染
      this.transfromData();
    }
  },
  methods: {
    transfromData () {
      //需要根据数据进行克隆，克隆后的数据再进行操作
      console.log(this.data)
      let AllData = _.cloneDeep(this.data); //深拷贝:目的防止在子组件操作父组件数据
      console.log(AllData + "AllData")
      //变成映射表
      let treeMapList = AllData.reduce((memo, current) => {
        current.label = current.name;
        memo[current["id"]] = current;
        return memo;
      }, {})
      //vue里vuex源码
      // console.log(treeMapList)
      let result = AllData.reduce((arr, current) => {
        let pid = current.pid;
        let parent = treeMapList[pid];
        if (parent) {
          parent.children ? parent.children.push(current) : parent.children = [current]
        } else if (pid === 0) {  //这是根文件夹
          arr.push(current);
        }
        return arr;
      }, [])
      console.log(result + "result")
      this.allData = result;
    }
  },
  mounted () {
    this.transfromData();
  }
}
</script>