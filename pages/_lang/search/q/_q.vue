<template>
  <div>
    <div class="black">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main" id="SearchList">
          <v-content>
            <v-layout row wrap>
              <v-flex xs8 md6>
                <v-text-field dark solo outline single-line color="white" :label="$t('Search game, id') + '...'" append-icon="search"
                  v-model="search" full-width autofocus></v-text-field>
              </v-flex>
              <v-flex xs4 md4>
                <v-btn large dark @click="searchButton">{{ $t('Search now') }}</v-btn>
              </v-flex>
              <v-flex xs12 md4>
                <h2>
                  <span v-if="isData" class="white--text">{{ $t('Total inquiry') }}: {{ resultLength }}</span>
                  <span v-else class="white--text">{{ $t('No data') }}</span>
                </h2>
                <h3 class="white--text">{{ $t('Query data time') }}: {{ fecthSearchTime }} MS</h3>
              </v-flex>
            </v-layout>
            <listSearchCard :result.sync="result" class="mt-5"></listSearchCard>
          </v-content>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import listSearchCard from '~/components/List/Search/Card/Default'
dayjs.extend(relativeTime)

export default {
  async asyncData ({ params, store }) {
    return {
      q: params.q,
      language: store.state.locale
    }
  },
  components: {
    listSearchCard
  },
  data: () => ({
    dialogAttention: false,
    fecthSearchTime: Number,
    q: String,
    isData: Boolean,
    result: String,
    resultLength: Number,
    search: String,
    list: String,
    page: 1,
    language: String
  }),
  created () {
  },
  methods: {
    searchButton: function () {
      if (this.search === 'undefined' || this.search === '') {
        this.$router.push({ path: this.$i18n.path('search/') })
      } else {
        this.$router.push({ path: this.$i18n.path('search/q/' + this.search) })
      }
    },
    time: function (value) {
      if (this.$store.state.locale === 'zh-cn') return dayjs().locale('zh-cn').from(dayjs(value))
      if (this.$store.state.locale === 'en-us') return dayjs().from(dayjs(value))
    }
  },
  mounted: function () {
    this.search = this.$route.params.q
    let fecthSearchTimeStart = performance.now()
    axios.get('https://rest.steamhub.cn/api/v2/apps/search?q=' + this.q + '&page=1')
      .then(response => {
        let fecthSearchTimeEnd = performance.now()
        this.fecthSearchTime = fecthSearchTimeEnd - fecthSearchTimeStart
        this.page = response.data.current_page
        if (response.data.length === 0) {
          this.isData = false
        } else {
          this.resultLength = response.data.total
          this.result = response.data
        }
      })
  },
  watch: {
    dialogAttention (val) {
      if (!val) return
      setTimeout(() => (this.dialogAttention = false), 1000)
    },
    page: function (newPage, oldPage) {
      this.$vuetify.goTo('#SearchList', 'easyInQuad')
      axios.get('https://rest.steamhub.cn/api/v2/apps/search?q=' + this.q + '&page=' + newPage)
        .then(response => {
          this.result = response.data
        })
    }
  },
  filters: {
  },
  head () {
    return {
      title: this.$t('global.page.search.q.title', { q: this.q }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.page.search.q.description', { q: this.q }), }
      ]
    }
  }
}
</script>