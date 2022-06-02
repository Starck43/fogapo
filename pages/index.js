import Post from '../components/forum/post'
import Layout from '../components/layout'
import {getAllPosts, getLatestPost} from "../core/api"

export default function Index({post, posts}) {
	return (
		<Layout>
			<Post post={post} posts={posts}/>
		</Layout>
	)
}

export async function getStaticProps() {
	const post = await getLatestPost()
	const posts = await getAllPosts()

	return {
		props: {
			post: post || null,
			posts: posts || null,

		},
		revalidate: 60 * 60 * 24,
	}
}
