import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(relativeTime)

Vue.prototype.$dayjs = dayjs
