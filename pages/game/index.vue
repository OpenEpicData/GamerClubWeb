<template>
  <div class="mt-5">
    <v-layout
      fill-height
      row
      wrap
    >
      <v-flex
        xs12
        md2
        class="text-xs-left"
        hidden-md-and-down
      >
        <v-text-field
          v-model="searchInputValue"
          outline
          label="回车搜索"
          single-line
          append-icon="search"
          clearable
          @keyup.enter="searchInput"
        />
        <div>
          <v-switch
            v-model="game_price"
            :label="`价格`"
          />
          <v-checkbox
            v-model="priceNullCheckbox"
            :label="`${priceNull.title}`"
            class="mt-0"
          />
          <v-radio-group
            v-for="(priceItem, priceIndex) in price.data"
            :key="priceIndex"
            v-model="priceCheckbox"
            class="mt-0"
          >
            <v-radio
              :label="`${priceItem.title}`"
              :value="`${priceItem.type}`"
            />
          </v-radio-group>
        </div>
        <div v-if="tags">
          <v-switch
            v-model="game_type"
            :label="`类型`"
          />
          <v-checkbox
            v-for="(tagsItem, tagsIndex) in tags.slice(0, 10)"
            :key="tagsIndex"
            v-model="typeCheckbox"
            :label="`${tagsItem}`"
            :value="`${tagsItem}`"
            class="mt-0"
          />
          <v-dialog
            v-model="moreTag"
            lazy
          >
            <v-card>
              <v-layout
                justify-start
                align-center
                row
                wrap
                class="px-5 py-5"
              >
                <v-flex
                  v-for="(tagsItem, tagsIndex) in tags.slice(10, 60)"
                  :key="tagsIndex"
                  xs4
                  sm3
                  md2
                  lg1
                >
                  <v-checkbox
                    v-model="typeCheckbox"
                    :label="`${tagsItem}`"
                    :value="`${tagsItem}`"
                    class="mt-0"
                  />
                </v-flex>
              </v-layout>
            </v-card>
          </v-dialog>
          <v-btn
            v-if="!moreTag"
            block
            round
            flat
            @click="moreTag = true"
          >
            更多
            <v-icon right>
              fas fa-angle-double-down
            </v-icon>
          </v-btn>
        </div>
        <div v-else>
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </div>
      </v-flex>
      <v-flex
        xs12
        md12
        lg8
        class="text-xs-left"
      >
        <div class="pl-5">
          <h1 class="display-1">
            所有结果
          </h1>
          <h4 class="body-2 mt-1">
            部分价格在某一时间进行过永久降价,搜索出来的结果可能与选项不匹配 <br>
            每个游戏可能具有多种类型,当前页面只显示最新的一种<br>
            当启用 "包含免费游戏" 时,价格筛选将失效
          </h4>
          <div class="mt-3">
            <v-chip
              v-if="searchInputValue"
              class="mx-0"
            >
              {{ searchInputValue }}
            </v-chip>
            <span
              v-for="(item, i) in typeCheckbox"
              :key="i"
            >
              <v-chip
                v-if="typeCheckbox[0]"
                class="mx-0"
              >
                {{ item }}
              </v-chip>
            </span>
            <span v-if="priceCheckbox[0]">
              <v-chip class="mx-0">
                {{ parseArray(priceCheckbox) }}
              </v-chip>
            </span>
          </div>
          <div class="mt-5">
            <v-dialog
              v-model="listsLoading"
              persistent
              width="300"
            >
              <v-card
                color="primary"
                dark
              >
                <v-cardText>
                  载入中,首次加载可能会有延迟...
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  />
                </v-cardText>
              </v-card>
            </v-dialog>
            <div v-if="lists">
              <div
                v-for="(dataItem, dataIndex) in lists.data"
                :key="dataIndex"
              >
                <div>
                  <div>
                    <v-layout
                      row
                      wrap
                      fill-height
                    >
                      <v-flex
                        xs1
                        md2
                        class="pt-1 hidden-sm-and-down"
                      >
                        <img :src="`https://steamcdn-a.opskins.media/steam/apps/${dataItem.AppID}/capsule_sm_120.jpg?t=1542333066`">
                      </v-flex>
                      <v-flex
                        xs9
                        md8
                      >
                        <div>
                          <h2 class="text-truncate subheading">
                            {{ dataItem.Name }}
                            <v-chip
                              v-if="dataItem.app_price[0]"
                              small
                            >
                              <span
                                v-if="dataItem.app_price[0].PriceDiscount > 0"
                                class="mr-2"
                              >
                                <del>￥ {{ dataItem.app_price[0].PriceInitial / 100 }}</del>
                              </span>
                              ￥ {{ dataItem.app_price[0].PriceFinal / 100 }}
                            </v-chip>
                            <v-chip
                              v-if="dataItem.app_tag[0]"
                              small
                            >
                              {{ dataItem.app_tag[0].Tag }}
                            </v-chip>
                          </h2>
                          <h3 class="text-truncate body-2">
                            {{ dataItem.ShortDescription }}
                          </h3>
                        </div>
                      </v-flex>
                      <v-flex xs2>
                        <v-btn
                          round
                          small
                          color="red-gradient"
                          disabled
                          outline
                        >
                          关注
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: null,
      lists: null,
      moreTag: false,
      game_type: true,
      game_price: true,
      listsLoading: true,
      searchInputValue: '',
      query_url: '',
      query_price_url: '',
      query_price_null: '',
      query_type_url: '',
      query_input_url: '',
      typeCheckbox: [],
      priceCheckbox: [],
      priceNullCheckbox: false,
      priceNull: {
        title: '包含免费游戏'
      },
      price: {
        title: '价格',
        data: [
          {
            title: '全部价格',
            type: [0, 300000]
          },
          {
            title: '小于 30 元',
            type: [0, 3000]
          },
          {
            title: '30 - 100 元',
            type: [3000, 10000]
          },
          {
            title: '100 - 150 元',
            type: [10000, 15000]
          },
          {
            title: '大于 150 元',
            type: [15000, 300000]
          }
        ]
      }
    }
  },
  watch: {
    searchInputValue: async function(newVal) {
      if (!newVal) {
        this.listsLoading = true
        let lists = await this.fetchSomething(
          'https://rest.steamhub.cn/api/search?query=search&q[]=null&price='
        )
        this.lists = lists
        this.listsLoading = false
        this.query_input_url = ''
      }
    },
    priceNullCheckbox: async function(newVal) {
      this.query_url = ''
      let url = `&price_null=${newVal}`
      this.query_price_null = this.query_url + url
      this.query_url =
        this.query_input_url +
        this.query_type_url +
        this.query_price_url +
        this.query_price_null
      this.listsLoading = true
      let lists = await this.fetchSomething(
        `https://rest.steamhub.cn/api/search?query=search${this.query_url}`
      )
      this.lists = lists
      this.listsLoading = false
    },
    typeCheckbox: async function(newVal) {
      this.query_url = ''
      this.query_type_url = ''
      let val = newVal.join('&type[]=')
      let url = `&type[]=${val}`
      this.query_type_url = this.query_url + url
      this.query_url =
        this.query_input_url +
        this.query_type_url +
        this.query_price_url +
        this.query_price_null
      this.listsLoading = true
      let lists = await this.fetchSomething(
        `https://rest.steamhub.cn/api/search?query=search${this.query_url}`
      )
      this.lists = lists
      this.listsLoading = false
    },
    priceCheckbox: async function(newVal) {
      this.query_url = ''
      this.query_price_url = ''
      let url = `&price=${newVal}`
      this.query_price_url = this.query_price_url + url
      this.query_url =
        this.query_input_url +
        this.query_type_url +
        this.query_price_url +
        this.query_price_null
      this.listsLoading = true
      let lists = await this.fetchSomething(
        `https://rest.steamhub.cn/api/search?query=search${this.query_url}`
      )
      this.lists = lists
      this.listsLoading = false
    }
  },
  async mounted() {
    await this.fetchTrending()
  },
  methods: {
    async fetchSomething(url) {
      return await this.$axios.$get(encodeURI(url))
    },
    async fetchTrending() {
      let [tags, lists] = await Promise.all([
        await this.fetchSomething(
          'https://rest.steamhub.cn/api/v2/apps/tags?type=list'
        ),
        await this.fetchSomething(
          'https://rest.steamhub.cn/api/search?query=search&q[]=null&price='
        )
      ])
      this.tags = tags
      this.lists = lists
      this.listsLoading = false
    },
    parseArray(val) {
      let array = val.split(',')
      if (array[0] === '0' && array[1] === '300000') {
        return '全部价格'
      } else if (array[1] === '300000') {
        return '大于 150 元'
      } else {
        return array[0] / 100 + ' - ' + array[1] / 100 + '元'
      }
    },
    async searchInput() {
      this.query_url = ''
      this.query_input_url = ''
      this.query_input_url = `&q[]=${this.searchInputValue}`
      this.query_url =
        this.query_input_url +
        this.query_type_url +
        this.query_price_url +
        this.query_price_null
      let lists = await this.fetchSomething(
        `https://rest.steamhub.cn/api/search?query=search${this.query_url}`
      )
      this.lists = lists
    }
  },
  head() {
    return {
      title: '游戏列表 -- SteamHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '浏览我们存储的 Steam 游戏数据.'
        }
      ]
    }
  }
}
</script>
