export const state = () => ({
  locales: ['zh-cn', 'en-us'],
  locale: 'zh-cn',
  display: {
    lang: String,
    country: String
  }
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) { state.locale = locale }
  },
  DISPLAY_LANG (state, locale) {
    const display = state.display
    if (locale === 'zh-cn') { display.lang = 'schinese', display.country = 'cn' }
    if (locale === 'en-us') { display.lang = 'english', display.country = 'us'}
  }
}