<template>
  <div>
    <ListNews :newsData="newsData" :type="'新闻'"></ListNews>
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
      axios.get(encodeURI('https://rest.steamhub.cn/api/v2/news/lists?size=20&type=新闻')),
    ])
    let data = []
    return {
      newsData: data.concat(newsData.data.data)
    }
  },
  head () {
    return {
      title: this.$t('global.page.topic.news.title') + ' -- SteamHub',
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.page.topic.news.description') }
      ]
    }
  }
}
</script>