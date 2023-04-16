// import getConfig from 'next/config'

export const getNaturalImageSizes = (img) => {
	return {
		width: img?.naturalWidth,
		height: img?.naturalHeight,
		ratio: img?.naturalWidth / img?.naturalHeight,
	}
}

export const getYear = () => {
	return new Date().getFullYear()
}


export const getCountdown = (target) => {
	let now = new Date()

	// Find the distance between now and the count down date
	let distance = target - now

	// If the count down is finished
	if (distance < 0) {
		return -1
	}

	// Time calculations for days, hours, minutes and seconds
	let days = Math.floor(distance / (1000 * 60 * 60 * 24))
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
	let seconds = Math.floor((distance % (1000 * 60)) / 1000)

	return {days, hours, minutes, seconds}
}


export const daysToTarget = (target) => {
	let {days} = getCountdown(new Date(target))
	console.log(days)
	switch (days) {
		case undefined:
			return null
		case 0:
			return <span>сегодня</span>
		case 1:
			return <span>остался 1 день</span>
		default:
			return <span>осталось {days} {days > 1 && days < 5 ? "дня" : "дней"}</span>
	}
}

export const createThumbUrl = (src, width) => {
	let path = src.split(".")
	if (path.length > 1) {
		let ext = path.pop()
		let thumbName = "_" + width + "w"
		return path.join(".") + thumbName + "." + ext
	}
	return src
}

export const smoothScroll = (target, offset, parent = null) => {
	if (typeof window === "undefined") return null
	let parentOffset
	if (!parent) {
		parent = window
		parentOffset = window.pageYOffset
	} else {
		parentOffset = parent.offsetTop
	}

	let childOffset = target.getBoundingClientRect().top
	parent.scrollTo({
		top: childOffset + parentOffset + offset,
		behavior: "smooth"
	})
}

export const absoluteUrl = (url) => {
	if (url && url.indexOf("http", 0) === -1) return process.env.SERVER + url
	return url
}

export const removeProtocol = (url) => url.replace(/^https?:\/\//i, "")

export const tripQuotes = (str) => str.replace(/^["'](.+(?=["']$))["']$/, "$1")


export const truncateHTML = (value, n = 200) => {
	let t = value.substring(0, n) // first cut
	let tr = t.replace(/<(.*?[^\/])>.*?<\/\1>|<.*?\/>/, "") // remove opened+closed tags
	// capture open tags
	let ar = tr.match(/<((?!li|hr|img|br|area|base|col|command|embed|input|keygen|link|meta|head|param|source|track|wbr).*?)>/g)

	if (ar) return t + "&hellip;" + ar.reverse().join("").replace(/</g, "<\/") // close tags
	return value
}

export const shimmer = (color, w, h = null) => `
		<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
		<linearGradient id="g">
		<stop stop-color="${color}" offset="20%" />
		<stop stop-color="#ccc" offset="50%" />
		<stop stop-color="${color}" offset="70%" />
		</linearGradient>
		</defs>
		${h == null
	? `<circle fill="${color}" cx="${w / 2}" cy="${w / 2}" r="${w / 2}"/><circle id="c" fill="url(#g)" cx="${w / 2}" cy="${w / 2}" r="${w / 2}"/>`
	: `<rect width="${w}" height="${h}" fill="${color}" /><rect id="r" width="${w}" height="${h}" fill="url(#g)" />`
}
		<animate xlink:href="#c" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/>
		</svg>`

export const toBase64 = (str) => (
	typeof window === "undefined"
		? Buffer.from(str).toString("base64")
		: window.btoa(str)
)
