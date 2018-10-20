<template>
  <div>
    <ListNews :type="'评测'"></ListNews>
  </div>
</template>

<script>
import ListNews from '~/components/List/News/Default'
export default {
  components: {
    ListNews
  },
  data: () => ({
  }),
  mounted: async function () {
  },
}
</script>