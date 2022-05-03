import {useRouter} from 'next/router'
import ErrorPage from 'next/error'

import Layout from '../components/layout'
import Post from "../components/forum/post"

import {getPost, getAllPosts} from '../core/api'


export default function Page({post, preview}) {
	const router = useRouter()
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404}/>
	}
	return (
		<Layout preview={preview}>
			{router.isFallback ? (
				<div>Loading…</div>
			) : (
				<Post post={post}/>
				)
			}
		</Layout>
	)
}

export async function getStaticProps({params}) {
	const post = await getPost(params.slug)

	return {
		props: {
			post
		},
	}
}

export async function getStaticPaths() {
	// fetching all posts only with a 'slug' field
	const posts = await getAllPosts(['slug'])

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			}
		}),
		fallback: false,
	}
}
