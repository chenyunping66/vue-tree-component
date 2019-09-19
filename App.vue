<template>
  <div>
    <MyTree :data="data" v-if="data.length"></MyTree>
  </div>
</template>
<script>
import MyTree from './MyTree.vue'
import { getTreeList } from './api'
export default {
  data () {
    return { data: [] }
  },
  components: {
    MyTree
  },
  async mounted () {
    let { data } = await getTreeList();
    // console.log(data);
    // 1)扁平数据如何变成多层数据 递归数据
    this.data = [...data.parent, ...data.child];
    // console.log(AllData);
    // this.data = AllData;
  }

}
</script>