import { useEffect, useRef, useState } from "react"
import { getCountdown, getNaturalImageSizes } from "./utils"

export const useTimeCounter = (datetime) => {
    const [countdown, setCountdown] = useState()
    const timer = useRef(0)

    useEffect(() => {
        if (!datetime) return
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
