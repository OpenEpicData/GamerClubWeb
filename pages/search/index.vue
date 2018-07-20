<template>
  <div>
  </div>
</template>

<script>
  export default {
    layout: 'search',
    data: () => ({
      dialogAttention: false,
      q: '',
      isData: true,
      result: '',
      resultLength: '',
      search: ''
    }),
    methods: {
      searchButton: function () {
        if (this.search === 'undefined' || this.search === '') {
          this.$router.push({path: '/search/'})
        } else {
          this.$router.push({path: '/search/q/' + this.search})
        }
      }
    },
    watch: {
      search (value) {
        if (value === 'undefined' || value === '') {
          this.$router.push({path: '/search/'})
        } else {
          this.$router.push({path: '/search/q/' + value})
        }
      }
    },
    head () {
      return {
        title: 'SteamHub 搜索 -- SteamHub Search',
        meta: [
          { hid: 'description', name: 'description', content: ' SteamHub Search 提供丰富的搜索选项以供全世界范围内的开发者及用户进行深度挖掘 ' }
        ]
      }
    }
  }
</script>

