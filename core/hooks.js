import {useEffect, useState} from "react"
import {getCountdown, getNaturalImageSizes} from "./utils"


export const useTimeCounter = (datetime) => {
	const [countdown, setCountdown] = useState({})

	useEffect(() => {
		let count = getCountdown(datetime)
		setCountdown(count)
		if (Object.keys(count).length) {
			// Update the count down every 1 second
			const interval = setInterval(() => {

				// Get current date and time estimate
				let currentCountdown = getCountdown(datetime)
				if (currentCountdown) {
					setCountdown(currentCountdown)
				} else {
					clearInterval(interval)
				}

			}, 1000)

			return () => clearInterval(interval)
		}

	}, [])
	return countdown
}


export const useImageData = (elem) => {
	const [imageData, setImageData] = useState({})
	useEffect(() => {
		let img = elem?.current.querySelector('img') || null
		if (img) {
			setImageData(getNaturalImageSizes(img))
		}
	}, [])
	return imageData
}