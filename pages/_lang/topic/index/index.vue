<template>
  <div>
    <ListNews :newsData="newsData"></ListNews>
  </div>
</template>

<script>
import axios from 'axios'
import ListNews from '~/components/List/News/Default'
export default {
  components: {
    ListNews
  },
  data: () => ({
    newsData: Object
  }),
  async asyncData () {
    let [newsData] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/news/lists?size=20&type='),
    ])
    let data = []
    return {
      newsData: data.concat(newsData.data.data)
    }
  },
  head () {
    return {
      title: this.$t('global.page.topic.default.title') + ' -- SteamHub',
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.page.topic.default.description') }
      ]
    }
  }
}
</script>