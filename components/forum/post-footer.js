import {memo} from "react"
import Partners from "./partners"


function PostFooter({post}) {
	if (post?.partners.length === 0) return null
	return (
		<footer className={`post-footer ${post.reviews?.length > 0 ? "bg-color-white" : "bg-color-primary"} p-2`}>
			<Partners partners={post.partners} className="partners-block mx-auto"/>
		</footer>
	)
}

export default memo(PostFooter)
