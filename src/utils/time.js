// export const getSpecialTime = (oldTime) => {
//   const nowTime = (new Date()).getTime()
//   const time = Math.floor((nowTime - oldTime) / 1000)
//   let res
//   if (time > 10 * 24 * 60 * 60) {
//   res = getTime(oldTime, 'YY-MM-DD hh:mm:ss')
//   } else if (time > 24 * 60 * 60) {
//   const n = Math.floor(time / (60 * 60 * 24))
//   res = `${n}天前`
//   } else if (time > 1 * 60 * 60) {
//   const n = Math.floor(time / (60 * 60))
//   res = `${n}小时前`
//   } else if (time > 60) {
//   const n = Math.floor(time / 60)
//   res = `${n}分钟前`
//   } else {
//   res = `${time}秒前`
//   }
//   return res
// }

export const getTime = (time, format) => {
	const date = new Date(time)
	const year = /(y+|Y+)/.test(format)
	if (year) {
		format = format.replace(/(y+|Y+)/, date.getFullYear() + '')
	}
	const obj = {
		'M+': date.getMonth() + 1,
		'd+|D+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (const key in obj) {
		if (new RegExp(`(${key})`).test(format)) {
			const str = obj[key] + ''
			format = format.replace(
				new RegExp(key), str.padStart(2, '0')
			)
		}
	}
	return format
}
