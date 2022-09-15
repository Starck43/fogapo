import Partners from "./partners"


export default function PostFooter({post}) {
	return (
		<footer className={`post-footer ${post.reviews?.length > 0 ? "bg-color-white" : "bg-color-primary"} p-2`}>
			<Partners partners={post.partners} className="partners-block mx-auto"/>
		</footer>
	)
}
