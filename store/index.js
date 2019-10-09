export const state = () => ({
  news: null,
  search: {
    query: '',
    page: 1,
    length: 16
  }
})

export const mutations = {
  set_news(state, data) {
    state.news = data
  },

  set_search_query(state, data) {
    state.search.query = data
  },

  set_search_page(state, data) {
    state.search.page = data
  },

  set_search_length(state, data) {
    state.search.length = data
  }
}

export const actions = {
  async fetch_news({ commit }) {
    commit('set_news', null)
    const fetchNews = await this.$axios.get(
      `/api/article/news?length=${this.state.search.length}&page=${this.state.search.page}&q=${this.state.search.query}`
    )
    const data = fetchNews.data
    commit('set_search_page', data.current_page)
    commit('set_news', data)
  }
}
