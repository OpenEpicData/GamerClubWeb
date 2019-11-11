<template>
  <v-app>
    <div @mouseover="drawer.mini = false" @mouseleave="drawer.mini = true">
      <v-navigation-drawer
        v-model="$store.state.drawer"
        :mini-variant.sync="drawer.mini"
        color="transparent"
        app
        left
        flat
      >
        <v-sheet>
          <v-list nav dense>
            <template v-for="(item, i) in drawer.list">
              <v-layout v-if="item.heading" :key="i">
                <v-flex xs6>
                  <v-subheader v-if="item.heading">{{
                    item.heading
                  }}</v-subheader>
                </v-flex>
              </v-layout>

              <v-divider
                v-else-if="item.divider"
                :key="i"
                dark
                class="my-4"
              ></v-divider>

              <v-list-item
                v-else
                :key="i"
                :disabled="!item.link"
                :to="item.target ? '' : item.link"
                :href="item.target ? item.link : ''"
                :target="item.target ? '_black' : ''"
                link
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-sheet>
      </v-navigation-drawer>
    </div>

    <changelog />

    <v-content>
      <appbar />
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import appbar from '~/components/layout/appbar'
import changelog from '~/components/notice/changelog'
export default {
  components: {
    appbar,
    changelog
  },
  data: () => ({
    drawer: {
      display: null,
      mini: true,
      list: [
        {
          icon: 'mdi-newspaper',
          text: '焦点资讯',
          link: '/'
        },
        {
          icon: 'mdi-account-outline',
          text: '为您推荐'
        },
        {
          icon: 'mdi-star-outline',
          text: '收藏夹'
        },
        {
          icon: 'mdi-account-group-outline',
          text: '社群'
        },
        {
          icon: 'mdi-calendar-text-outline',
          text: '事件'
        },
        { divider: true },
        {
          icon: 'mdi-github-circle',
          text: 'GitHub',
          link: 'https://github.com/OpenEpicData/GamerClubWeb',
          target: true
        },
        {
          icon: 'mdi-message-alert-outline',
          text: '发送反馈'
        }
      ]
    }
  })
}
</script>

<style lang="scss">
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
  text-decoration-line: none;
}
.underline {
  text-decoration-line: none;
  width: calc(100%);
  background-image: linear-gradient(
    transparent calc(100% - 10px),
    #28355c 10px
  );
  background-repeat: no-repeat;
  background-size: 0% 100%;
  transition: background-size 1s;
}

.link:hover .underline {
  background-size: 100% 100%;
}

.pointer:hover {
  cursor: pointer;
}

.news_card {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

.top::before {
  content: '·';
  padding-left: 20px;
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
