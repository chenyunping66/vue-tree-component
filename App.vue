<template>
  <div>

  </div>
</template>
<script>
import { getTreeList } from './api'
export default {
  async mounted () {
    let { data } = await getTreeList();
    console.log(data);
  }

}
</script>