<template>
  <div>
    <v-layout wrap row v-if="result">
      <v-flex xs12 md8 v-for="(item,i) in result.data" :key="i" class="search-list-card" style="border: 1px solid #fff">
        <v-hover>
          <v-card dark color="black" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`" v-if="item.AppType" flat>
            <div>
              <v-card-title primary-title class="black">
                <v-layout align-start justify-start row fill-height>
                  <v-flex>
                    <nuxt-link :to="$i18n.path('apps/'+ item.AppID)">
                      <h3 class="mb-0 display-1 white--text">
                        <span v-if="item.Name && item.ChineseName && language === 'zh-cn'">
                          {{ item.ChineseName }}
                        </span>
                        <span v-else-if="item.Name">{{ item.Name }}</span>
                      </h3>
                    </nuxt-link>
                    <!-- <ve-line :data="chartData[i]" :legend-visible="false"></ve-line> -->
                    <div>
                      <span v-for="(item, i) in item.app_info" :key="i">
                        <span v-if="item.Key === 117">{{ $t('Supported system') }}：{{ item.Value }}</span>
                      </span>
                    </div>

                    <span class="grey--text">{{ $t('Updated on') }}: {{ time(item.LastUpdated) }}</span>
                  </v-flex>
                  <v-flex flexbox class="text-xs-right" v-if="item.AppType">
                    <v-btn class="card-right-attention-icon" small color="red" dark>
                      <v-icon left>
                        add
                      </v-icon>
                      {{ $t('attention') }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </div>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
    <vs-pagination :total="result.last_page" v-model="result.current_page" class="mt-5" color="black"></vs-pagination>
  </div>
</template>

<script>
export default {
  props: ['result'],
  data: () => ({
    time: Number
  })
}
</script>

<style>
  .vs-pagination--ul, .vs-pagination--buttons {
    background: #424242
  }
  .vs-pagination--nav {
    justify-content: left
  }
  .card-right-attention-icon {
    display: none;
  }

  .search-list-card :hover .card-right-icon {
    display: none;
  }

  .search-list-card :hover .card-right-attention-icon {
    display: inline;
  }

  .v-image__image--preload {
    filter: blur(0)
  }

  @media (max-width: 960px) {
    .card-right-attention-icon {
      display: inline;
    }

    .card-right-icon {
      display: none;
    }
  }
</style>