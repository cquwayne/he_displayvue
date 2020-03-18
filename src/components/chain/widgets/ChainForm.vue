<template>
  <div class="ChainForm">
    {{chainForm}}
  </div>
</template>
<script>
export default {
  name: 'ChainForm',
  data () {
    return {
      chainForm: {
        title: null
      },
      postFlag: 0,
      putFlag : 1,
      editFlag: 0
    }
  },
  methods: {
    updateForm (chain) {
      if (chain === null) {
        this.chainForm = {}
        this.editFlag = this.postFlag
      } else {
        this.editFlag = this.putFlag
        this.chainForm = chain
      }
    }
  }
}
</script>
