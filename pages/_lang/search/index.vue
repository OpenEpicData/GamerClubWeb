<template>
  <div>
    <v-app class="g-blue-hydrogen" dark>
      <v-content>
        <v-container fluid fill-height class="index-main-container">
          <v-layout align-center justify-center row>
            <v-flex xs12 sm10 md8 lg6>
              <v-text-field
                solo
                outline
                single-line
                color="white"
                :label="$t('Search game, id') + '...'"
                append-icon="search"
                v-model="search"
                full-width
                autofocus
              ></v-text-field>
              <div class="text-xs-center">
                <v-btn large color="white" light @click="searchButton">{{ $t('Search now') }}</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialogAttention: false,
    q: '',
    isData: true,
    result: '',
    resultLength: '',
    search: ''
  }),
  methods: {
    searchButton: function () {
      if (this.search === 'undefined' || this.search === '') {
        this.$router.push({ path: this.$i18n.path('search/') })
      } else {
        this.$router.push({ path: this.$i18n.path('search/q/') + this.search })
      }
    }
  },
  watch: {
    search (value) {
      if (value === 'undefined' || value === '') {
      } else {
      }
    }
  },
  head () {
    return {
      title: this.$t('global.page.search.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
              this.$t('global.page.search.description'),
        }
      ]
    }
  }
}
</script>
