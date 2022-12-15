import {useRouter} from "next/router"
import ErrorPage from "next/error"
import {AiOutlineLoading3Quarters as Loader} from "react-icons/ai"

import Layout from "../components/layout"
import Post from "../components/forum/post"
import {getPost, getAllPosts} from "../core/api"


export default function Page({post, posts, preview}) {
	const router = useRouter()
	if (!router.isFallback && !post?.id) {
		return <ErrorPage statusCode={404}/>
	}
	return (
		<Layout preview={preview}>
			{router.isFallback
				? (
					<div className="centered">
						<Loader/>
					</div>
				) : (
					<Post post={post} posts={posts}/>
				)
			}
		</Layout>
	)
}

export async function getStaticProps({params}) {
	const post = await getPost(params.id)
	const posts = await getAllPosts()

	if (!post) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}
	return {
		props: {
			post,
			posts,
		},
		revalidate: 60 * 60 * 24,

	}
}

export async function getStaticPaths() {
	// fetching all posts only with a 'id' field
	const posts = await getAllPosts(["id"]) || []

	return {
		paths: posts.map((post) => {
			return {
				params: {
					id: post.id.toString(),
				},
			}
		}),
		fallback: false,
	}
}
