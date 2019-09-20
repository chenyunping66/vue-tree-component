<template>
  <div>

  </div>
</template>
<script>
import { getTreeList } from './api'
export default {
  async mounted () {
    let { data } = await getTreeList();
    // console.log(data); //请求到接口数据
    //1)扁平数据如何变成多层数据，递归数据
    let AllData = [...data.parent, ...data.child]
    // console.log(AllData)   //变成数组
    //2)变成映射表  {id:1,{name:"文件夹1"，pid:0,id:1}}
    let treeMapList = AllData.reduce((memo, current) => {
      // current.label = current.name;
      memo[current["id"]] = current;
      return memo;
    }, {})
    // console.log(treeMapList);
    // 3)讲父子文件夹拼接成二维数组:vue里面vuex的源码
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
    console.log(result)
  }

}
</script>