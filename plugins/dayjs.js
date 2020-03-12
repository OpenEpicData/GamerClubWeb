import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekday from 'dayjs/plugin/weekday'
import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)

Vue.prototype.$dayjs = dayjs
