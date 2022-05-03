import Post from '../components/forum/post'
import Layout from '../components/layout'
import {getLatestPost} from '../core/api'

export default function Index({post}) {

	return (
		<Layout>
			<Post post={post}/>
		</Layout>

	)
}

export async function getStaticProps() {
	const post = await getLatestPost()

	return {
		props: {
			post: post || null
		},
	}
}
