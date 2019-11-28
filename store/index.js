export const strict = false

export const state = () => ({
  title: 'EpicGamer',
  data: {
    news: null,
    tags: null,
    refs: null,
    steam: {
      user: {
        count: {
          user: null,
          created_at: null
        }
      },
      weekly: {
        sellers: null
      }
    }
  },
  search: {
    query: '',
    tagName: '',
    refName: '',
    page: 1,
    length: 16
  },
  user: {
    login: false
  },
  analysis: {
    news: null
  }
})

export const mutations = {
  setSearch(state, data) {
    state.search = Object.assign(state.search, data)
  },

  setData(state, data) {
    state.data = Object.assign(state.data, data)
  },

  setAnalysisNews(state, analysisNews) {
    state.analysis.news = analysisNews
  },

  setSteamUserCount(state, data) {
    state.data.steam.user.count = Object.assign(
      state.data.steam.user.count,
      data
    )
  },

  setSteamWeekly(state, data) {
    state.data.steam.weekly = Object.assign(state.data.steam.weekly, data)
  }
}

export const actions = {
  fetch_news({ commit }) {
    commit('setData', { news: null })
    return this.$axios
      .get(
        `/api/article/news
?length=${this.state.search.length}
&page=${this.state.search.page}
&q=${this.state.search.query}
&tagName=${this.state.search.tagName}
&refName=${this.state.search.refName}`
      )
      .then((res) => {
        commit('setSearch', { page: res.data.current_page })
        commit('setData', { news: res.data })
      })
  },

  fetch_tags({ commit }) {
    return this.$axios.get(`/api/article/tags`).then((res) => {
      commit('setData', { tags: res.data })
    })
  },

  fetch_refs({ commit }) {
    return this.$axios.get(`/api/article/refs`).then((res) => {
      commit('setData', { refs: res.data })
    })
  },

  fetch_analysis_news({ commit }) {
    commit('setAnalysisNews', null)
    return this.$axios.get(`/api/analysis/news`).then((res) => {
      commit('setAnalysisNews', res.data)
    })
  },

  async fetch_steam_user_count({ commit }) {
    const res = await this.$axios.get('/api/game/steam/user_count')
    commit('setSteamUserCount', {
      user: res.data.user,
      created_at: res.data.created_at
    })
  },

  async fetch_steam_weekly_sellers({ commit }) {
    const res = await this.$axios.get('/api/game/steam/weekly_top_sellers')
    commit('setSteamWeekly', {
      sellers: res.data
    })
  }
}
