<template>
  <div>
    <div class="text-xs-center mt-5">
      <h1 class="headline">
        {{ $t('We update SteamHub with incremental updates', {'name': 'SteamHub'}) }}
        <a href="https://github.com/InGaming" target="_black">
          <v-tooltip top>
            <v-icon class="mx-2 blue--text" slot="activator">fas fa-code</v-icon>
            {{ $t('View the SteamHub main repository', {'name': 'SteamHub'}) }}
          </v-tooltip>
        </a>
      </h1>
    </div>
    <v-container fluid grid-list-xs>
      <v-layout wrap row>
        <v-flex xs12 lg4>
          <h2 class="title my-3 text-xs-center">
            <span class="g-blue-hydrogen-text">SteamHub.Web</span>
            <a href="https://github.com/InGaming/SteamHub.Web" target="_black">
              <v-icon class="mx-2">fas fa-code-branch</v-icon>
            </a> 
          </h2>

          <v-timeline dense>
            <v-timeline-item
              v-for="(item, i) in webData"
              :key="i"
              color="g-blue-hydrogen"
              small
            >
            <span></span>
              <v-layout pt-3>
                <v-flex xs3>
                  <strong>{{ time(item.commit.author.date) }}</strong>
                </v-flex>
                <v-flex>
                  <strong>{{ item.commit.message }}</strong>
                  <div>Author: {{ item.commit.author.name }}</div>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
        <v-flex xs12 lg4>
          <h2 class="title my-3 text-xs-center">
            <span class="g-blue-hydrogen-text">SteamHub.API</span>
            <a href="https://github.com/InGaming/SteamHub.API" target="_black">
              <v-icon class="mx-2">fas fa-code-branch</v-icon>
            </a>
          </h2>
          
          <v-timeline dense>
            <v-timeline-item
              v-for="(item, i) in apiData"
              :key="i"
              color="g-blue-hydrogen"
              small
            >
              <v-layout pt-3>
                <v-flex xs3>
                  <strong>{{ time(item.commit.author.date) }}</strong>
                </v-flex>
                <v-flex>
                  <strong>{{ item.commit.message }}</strong>
                  <div>Author: {{ item.commit.author.name }}</div>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
        <v-flex xs12 lg4>
          <h2 class="title my-3 text-xs-center">
            <span class="g-blue-hydrogen-text">SteamHub.RESTful</span>
            <a href="https://github.com/InGaming/SteamHub.RESTful" target="_black">
              <v-icon class="mx-2">fas fa-code-branch</v-icon>
            </a>
          </h2>
          
          <v-timeline dense>
            <v-timeline-item
              v-for="(item, i) in restData"
              :key="i"
              color="g-blue-hydrogen"
              small
            >
            <span></span>
              <v-layout pt-3>
                <v-flex xs3>
                  <strong>{{ time(item.commit.author.date) }}</strong>
                </v-flex>
                <v-flex>
                  <strong>{{ item.commit.message }}</strong>
                  <div>Author: {{ item.commit.author.name }}</div>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import ListGameCardLoading from '~/components/List/Game/Card/Loading'
dayjs.extend(relativeTime)

export default {
  data: function () {
    return {
      webData: Object,
      apiData: Object,
      restData: Object
    }
  },
  async asyncData () {
    let [webData, apiData, restData] = await Promise.all([
      axios.get('https://api.github.com/repos/InGaming/SteamHub.Web/commits'),
      axios.get('https://api.github.com/repos/InGaming/SteamHub.API/commits'),
      axios.get('https://api.github.com/repos/InGaming/SteamHub.RESTful/commits'),
    ])
    return {
      webData: webData.data,
      apiData: apiData.data,
      restData: restData.data,
    }
  },
  methods: {
    time: function (value) {
      if (this.$store.state.locale === 'zh-cn') return dayjs().locale('zh-cn').from(dayjs(value))
      if (this.$store.state.locale === 'en-us') return dayjs().from(dayjs(value))
    },
  },
  head () {
    return {
      title: this.$t('global.page.changelog.index.title') + ' -- SteamHub' ,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
              this.$t('global.page.changelog.index.description', {'name': 'SteamHub'}),
        }
      ]
    }
  }
}
</script>
