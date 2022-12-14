import {useEffect, useRef, useState} from "react"
import {getCountdown, getNaturalImageSizes} from "./utils"


export const useTimeCounter = (datetime) => {
	const [countdown, setCountdown] = useState({})
	const timer = useRef(0)

	useEffect(() => {
		const count = getCountdown(datetime)
		setCountdown(count)
		if (Object.keys(count).length) {
			// Update the count down every 1 second
			timer.current = setInterval(() => {

				// Get current date and time estimate
				let currentCountdown = getCountdown(datetime)
				if (currentCountdown) {
					setCountdown(currentCountdown)
				} else {
					clearInterval(timer.current)
				}

			}, 1000)

			return () => clearInterval(timer.current)
		}

	}, [datetime])
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
