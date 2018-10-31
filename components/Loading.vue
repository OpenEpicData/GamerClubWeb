<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    start () {
      this.openLoading('radius', 'danger')
      this.activeLoading = true
    },
    finish () {
      this.$vs.loading.close()
      this.activeLoading = false
    },
    openLoading (type, color) {
      this.activeLoading = false
      this.$vs.loading({
        type: type,
        color: color
      })
    },
  },
}
</script>

