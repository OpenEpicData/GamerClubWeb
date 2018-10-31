<template>
  <div class="black">
    <div>
      <Parallax></Parallax>
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main">
          <v-layout row wrap class="mb-5">
            <v-flex xs12 md6>
              <CarouselTab></CarouselTab>
            </v-flex>
            <v-flex xs12 md6>
              <TabNews :newsData.sync="newsData" :newsOnly.sync="newsOnly" :evaluation.sync="evaluation"></TabNews>
            </v-flex>
          </v-layout>
          
          <v-layout row wrap>
            <v-flex xs12 md6>
              <ListGameTab></ListGameTab>
            </v-flex>
            <v-flex xs12 md6>
              <ToolGrid></ToolGrid>
            </v-flex>
          </v-layout>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import ListGameTab from '~/components/List/Game/Card/Tab'
import Parallax from '~/components/Parallax/Default'
import CarouselTab from '~/components/Carousel/Tab'
import TabNews from '~/components/Tab/News'
import ToolGrid from '~/components/Tool/Grid'
import axios from 'axios'

export default {
  async asyncData () {
    let [newsData, newsOnly, evaluation] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/news/lists?size=6'),
      axios.get(encodeURI('https://rest.steamhub.cn/api/v2/news/lists?size=6&type=新闻')),
      axios.get(encodeURI('https://rest.steamhub.cn/api/v2/news/lists?size=6&type=评测')),
    ])
    return {
      newsData: newsData.data,
      newsOnly: newsOnly.data,
      evaluation: evaluation.data
    }
  },
  components: {
    ListGameTab,
    Parallax,
    CarouselTab,
    TabNews,
    ToolGrid
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: this.$t('global.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.description') }
      ]
    }
  }
}
</script>