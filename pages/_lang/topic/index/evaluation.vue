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
  head () {
    return {
      title: this.$t('global.page.topic.reviews.title') + ' -- SteamHub',
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.page.topic.reviews.description') }
      ]
    }
  }
}
</script>