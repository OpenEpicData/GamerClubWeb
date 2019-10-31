<template>
  <v-dialog
    v-model="$store.state.changelog.dialog"
    width="1000px"
    height="80vh"
  >
    <v-card>
      <v-app-bar height="auto">
        <v-btn icon @click="$store.dispatch('fetch_changelog')">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-toolbar-title>更新日志</v-toolbar-title>
      </v-app-bar>
      <v-card-text>
        <div v-if="!$store.state.changelog.data">
          <v-skeleton-loader
            v-for="k in 12"
            :key="k"
            class="mx-auto"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
        </div>

        <v-timeline dense clipped>
          <v-timeline-item
            v-for="(item, i) in $store.state.changelog.data"
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
                  <span class="underline">
                    {{ item.commit.message }}
                  </span>
                </a>
                <br />
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
</template>
