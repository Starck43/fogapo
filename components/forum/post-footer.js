import { memo } from "react"
import Partners from "./partners"

function PostFooter({ partners, className }) {
    if (!partners.length) return null

    return (
        <footer className={`post-footer ${className} p-2`}>
            <Partners partners={partners} className="partners-block mx-auto" />
        </footer>
    )
}

export default memo(PostFooter)
