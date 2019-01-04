export const state = () => ({
  reviews: {
    trunPrice: false
  }
})

export const mutations = {
  SET_REVIEWS_TRUN_PRICE(state) {
    const trun = state.turn
    if (trun) {
      state.reviews.trunPrice = false
    } else {
      state.reviews.trunPrice = true
    }
  }
}
