<template>
  <div>
    <div class="grey lighten-4">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="hidden-md-and-down">
          <Carousel :carousel.sync="carousel"></Carousel>
        </div>
        <div class="page-main mt-5">
          <div class="px-2">
            <v-btn color="g-blue-hydrogen" dark class="mx-0">
              <v-icon left>blur_on</v-icon>
              {{ $t('trend') }}
            </v-btn>
          </div>
          <v-layout class="px-2 mt-3" row wrap id="today">
            <v-flex xs12 md8>
              <h2>
                {{ $t('today') }}
                <v-chip>{{ month }} - {{ day }}</v-chip>
              </h2>
            </v-flex>
            <v-flex xs12 md4>
              <div class="text-xs-right hidden-sm-and-down">
                <h3>{{ $t('Update items in the queue') }}: {{ queue }}</h3>
              </div>
            </v-flex>
          </v-layout>

          <div class="mt-3">
            <ListGameCard :list.sync="list.data"></ListGameCard>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import ListGameCard from '~/components/List/Game/Card/Default'
import Carousel from '~/components/Carousel/Default'
import axios from 'axios'

export default {
  components: {
    ListGameCard,
    Carousel
  },
  data () {
    return {
      queue: Number,
      month: Number,
      day: Number,
      list: String,
      carousel: [
        {
          src: 'https://images4.alphacoders.com/629/629243.jpg',
          left: true,
          title: this.$t('carousel.item1.title'),
          description: this.$t('carousel.item1.description'),
          btn_title: this.$t('learn-more'),
          color: 'white--text',
          dark: true,
          star: this.$t('carousel.item1.star'),
          to: this.$i18n.path('apps/435150'),
          gradient: 'to right, rgba(20,30,48,.5), rgba(36,59,85,.5)'
        },
        {
          src: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE26uIj',
          left: true,
          title: this.$t('carousel.item2.title'),
          description: this.$t('carousel.item2.description'),
          btn_title: this.$t('learn-more'),
          star: this.$t('carousel.item2.star'),
          color: 'white--text',
          dark: true,
          to: this.$i18n.path('apps/750920'),
          gradient: 'to right, rgba(20,30,48,.5), rgba(36,59,85,.5)'
        },
        {
          src: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc02EDIiHVva.zlM4YNLDcbGls0XD.tKgCL2Ya_T4MPFLnEDq6KaWYYyOFR_Utg.AEM5Fd8np3bVqJ3x2PGJ7hcUyjRi9JtQTpP.I5.e2A57ztX.Mvzlt7w7pUzJ.M7C5dhiJX.4PrQt7zvKcOrGSNXVKxugEGtiFuf0GElxRuGtk-&h=1080&w=1920&format=jpg',
          left: true,
          title: this.$t('carousel.item3.title'),
          description: this.$t('carousel.item3.description'),
          btn_title: this.$t('learn-more'),
          color: 'white--text',
          dark: true,
          star: this.$t('carousel.item3.star'),
          to: this.$i18n.path('apps/255710'),
          gradient: 'to right, rgba(20,30,48,.5), rgba(36,59,85,.5)'
        }
      ]
    }
  },
  mounted: async function () {
    let cc = 'cn'
    if (this.$store.state.locale === 'zh-cn') { cc = 'cn' }
    if (this.$store.state.locale === 'en-us') { cc = 'us' }
    const Today = new Date()
    this.month = Today.getMonth() + 1
    this.day = Today.getDate()
    let [queue, apps] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/game/search/app/update_queue/count'),
      axios.get('https://rest.steamhub.cn/api/v2/apps/lists?page=1&param=24' + '&cc=' + cc)
    ])
    this.queue = queue.data
    this.list = apps.data
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