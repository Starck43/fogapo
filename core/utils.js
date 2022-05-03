// import getConfig from 'next/config'

export const isSafari = () => {
	var userAgent = navigator.userAgent.toLowerCase()
	return /^((?!chrome|android).)*safari/i.test(userAgent)
}

export const getNaturalImageSizes = (img) => {
	return {
		width: img?.naturalWidth,
		height: img?.naturalHeight,
		ratio: img?.naturalWidth / img?.naturalHeight,
	}
}

export const getYear = () => {
	return new Date().getFullYear();
}


export const getCountdown = (target) => {
	let now = new Date();

	// Find the distance between now and the count down date
	let distance = target - now;

	// If the count down is finished
	if (distance < 0) {
		return {}
	}

	// Time calculations for days, hours, minutes and seconds
	let days = Math.floor(distance / (1000 * 60 * 60 * 24));
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);

	return {days, hours, minutes, seconds}
}


export const createThumbUrl = (src, width) => {
	let path = src.split('.')
	if (path.length > 1) {
		let ext = path.pop()
		let thumbName = '_' + width + 'w'
		return path.join('.') + thumbName + '.' + ext
	}
	return src
}


export const absoluteUrl = (url) => {
	if (url && url.indexOf('http', 0) === -1) return process.env.SERVER + url
	return url
}

export const truncateHTML = (value, n = 200) => {
	let t = value.substring(0, n) // first cut
	let tr = t.replace(/<(.*?[^\/])>.*?<\/\1>|<.*?\/>/, "") // remove opened+closed tags
	// capture open tags
	let ar = tr.match(/<((?!li|hr|img|br|area|base|col|command|embed|input|keygen|link|meta|head|param|source|track|wbr).*?)>/g)

	if (ar) return t + "&hellip;" + ar.reverse().join("").replace(/</g, "<\/") // close tags
	return value
}

