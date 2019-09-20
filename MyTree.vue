<template>
  <el-tree :data="allData">

  </el-tree>
</template>
<script>
import _ from 'loadsh';
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      allData: []
    }

  },
  watch: {  //需要监控父组件传递的data属性，如果有更新，就重新渲染
    data () {
      //数据更新后重新渲染
      this.transfromData();
    }
  },
  methods: {
    transfromData () {
      //需要根据数据进行克隆，克隆后的数据再进行操作
      let AllData = _.cloneDeep(this.dataList);  //深拷贝防止在子组件操作父组件数据
      //2)变成映射表  {id:1,{name:"文件夹1"，pid:0,id:1}}
      let treeMapList = AllData.reduce((memo, current) => {
        current.label = current.name;
        memo[current["id"]] = current;
        return memo;
      }, {})
      // console.log(treeMapList);
      // 3)讲父子文件夹拼接成二维数组:vue里面vuex源码
      let result = AllData.reduce((arr, current) => {
        let pid = current.pid;
        let parent = treeMapList[pid];
        if (parent) {   //判断父文件夹里面是否有子文件夹
          parent.children ? parent.children.push(current) : parent.children = [current]
        } else if (pid === 0) {  //这是文件夹
          arr.push(current)
        }
        return arr;
      }, [])
      // console.log(result)
      this.allData = result;
    }
  },
  mounted () {
    this.transfromData();
  }
}
</script>