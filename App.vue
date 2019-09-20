<template>
  <div>
    <My-Tree :dataList="data" v-if="data.length" :fileDrop="fileDrop" :diectoryDrops="diectoryDrops"></My-Tree>
  </div>
</template>
<script>
import { getTreeList } from './api'
import MyTree from './MyTree'
export default {
  data () {
    return {      data: [],
      fileDrop: [
        { text: "rm", value: '删除文件' }
      ],
      diectoryDrops: [
        { text: 'rn', value: '修改文件' },
        { text: 'rm', value: '删除文件夹' }
      ]
    }
  },
  components: {
    MyTree,
  },
  async mounted () {
    let { data } = await getTreeList();
    // console.log(data); //请求到接口数据
    //1)扁平数据如何变成多层数据，递归数据
    data.parent.forEach(p => p.type = 'parent')  //添加type属性
    let AllData = [...data.parent, ...data.child]
    // console.log(AllData)   //变成数组
    this.data = AllData;
  }

}
</script>