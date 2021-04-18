<template>
  <div>
    <el-image
      :src="url"
      :preview-src-list="srcList">
    </el-image>
  </div>
</template>

<script>
export default {
  name: 'Prediction',
  data () {
    return {
      // url: '/static/image/111.png',
      url: require('C:\\Users\\76133\\Desktop\\data\\111.png'),
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      srcList: [
        require('C:/Users/76133/Desktop/data/222.png'),
        require('C:/Users/76133/Desktop/data/333.png')
      ]
    }
  }
}
</script>

<style scoped>

</style>

<!--@GetMapping("/compute")-->
<!--public void computeModel(@RequestParam String id) throws Exception {-->

<!--String[] args1 = new String[] { "python", "D:\\PycharmProjects\\pythonProject\\predict.py", id};-->
<!--Process proc = Runtime.getRuntime().exec(args1);-->
<!--// 用输入输出流来截取结果-->
<!--BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));-->
<!--String line = null;-->
<!--while ((line = in.readLine()) != null) {-->
<!--if (line.equals("finish")) {-->

<!--}-->
<!--}-->
<!--in.close();-->
<!--proc.waitFor();-->
<!--}-->
