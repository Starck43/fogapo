//import DATA from "./constants"
//import {apiDataFetch} from "./apiDataFetch"

export async function getPost(slug) {
	//const post = DATA.posts[0]
	const res = await fetch(process.env.API_SERVER+process.env.API_ENDPOINTS.posts+`/${slug}/`)
	return await res.json()
}

export async function getLatestPost() {
	//const post = DATA.posts[0]
	const res = await fetch(process.env.API_SERVER+process.env.API_ENDPOINTS.latest+'/')
	return await res.json()
}

export async function getAllPosts(fields = []) {
	//const posts = DATA.posts
	let params = 'fields='

	fields.forEach((field) => {
		params += '&' + field
	})

	if (params) {
		//fetching data from server via api
		const res = await fetch(process.env.API_SERVER+process.env.API_ENDPOINTS.posts+`?${params}/`)
		return await res.json() || []
	}
	else {
		const res = await fetch(process.env.API_SERVER+process.env.API_ENDPOINTS.posts+'/')
		return await res.json() || []
	}
}
