<template>
  <v-app>
    <div>
      <v-app-bar color="primary tertiary--text">
        <span class="title ml-3 mr-5">
          EpicData&nbsp;|
          <span class="font-weight-light">Gamer</span>
        </span>
        <v-text-field
          v-model="search"
          solo-inverted
          flat
          hide-details
          label="搜索"
          prepend-inner-icon="mdi-magnify"
          class="d-none d-md-flex"
          @keyup.enter="searching()"
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-btn
          rounded
          large
          color="secondary"
          @click="
            dialog = true
            $store.dispatch('fetch_update_log')
          "
          >更新日志</v-btn
        >
      </v-app-bar>
    </div>

    <v-dialog v-model="dialog" width="1000px" height="80vh">
      <v-card class="secondary-primary">
        <v-card-text>
          <div v-if="!$store.state.updateLog">
            <v-skeleton-loader
              v-for="k in 6"
              :key="k"
              class="mx-auto"
              type="list-item-avatar-three-line"
            ></v-skeleton-loader>
          </div>

          <v-timeline dense clipped>
            <v-timeline-item
              v-for="(item, i) in $store.state.updateLog"
              :key="i"
              small
            >
              <template v-slot:icon>
                <v-avatar>
                  <img :src="item.author.avatar_url" />
                </v-avatar>
              </template>
              <v-row justify="space-between">
                <v-col cols="12" xs="12" md="4">
                  <a
                    :href="item.html_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link accent--text"
                  >
                    {{ item.commit.message }}
                  </a>
                  Author: {{ item.commit.author.name }}
                </v-col>
                <v-col class="text-right" cols="12" md="4">
                  {{ item.commit.author.date }}
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-content class="secondary">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: null,
      dialog: false
    }
  },
  methods: {
    searching() {
      this.$store.commit('set_search_query', this.search)
      this.$store.dispatch('fetch_news')
    }
  }
}
</script>

<style lang="scss">
.theme--dark.v-list {
  background: #3d4a5c !important;
}
.secondary-primary {
  background: linear-gradient(90deg, #3d4a5c, #243042);
}
.v-card {
  $height: 34px;
  .v-toolbar__content {
    height: $height !important;
  }
  .v-toolbar__content {
    padding: 0px 14px;
  }
}
.link {
  text-transform: uppercase;
  text-decoration-line: none;
}
.link:hover::after {
  width: 100%;
  left: 0;
}
.link::after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: '';
  display: block;
  height: 2px;
  left: 0%;
  position: relative;
  background: #fff;
  transition: width 0.5s ease 0s, left 0.5s ease 0s;
  width: 0;
}

.pointer:hover {
  cursor: pointer;
}

.theme--dark.v-skeleton-loader .v-skeleton-loader__actions,
.theme--dark.v-skeleton-loader .v-skeleton-loader__article,
.theme--dark.v-skeleton-loader .v-skeleton-loader__card-heading,
.theme--dark.v-skeleton-loader .v-skeleton-loader__card-text,
.theme--dark.v-skeleton-loader .v-skeleton-loader__date-picker,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-text,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-two-line,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar-two-line,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-three-line,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar-three-line,
.theme--dark.v-skeleton-loader .v-skeleton-loader__table-heading,
.theme--dark.v-skeleton-loader .v-skeleton-loader__table-thead,
.theme--dark.v-skeleton-loader .v-skeleton-loader__table-tbody,
.theme--dark.v-skeleton-loader .v-skeleton-loader__table-tfoot {
  background: transparent !important;
}
::-webkit-scrollbar {
  background-color: #3d4a5c;
  width: 12px;
  background-clip: padding-box;
}

/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
  background-color: #243042;
}
</style>
