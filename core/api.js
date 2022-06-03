//import DATA from "./constants"
//import {apiDataFetch} from "./apiDataFetch"

export async function getPost(id) {
	//const post = DATA.posts[0]
	const res = await fetch(process.env.API_SERVER+process.env.API_ENDPOINTS.posts+`/${id}/`)
	return await res.json()
}

export async function getLatestPost() {
	//const post = DATA.posts[0]
	const res = await fetch(process.env.API_SERVER+process.env.API_ENDPOINTS.latest+'/')
	return await res.json()
}

export async function getAllPosts(fields = []) {
	//const posts = DATA.posts
	let params = ''

	fields.forEach((field) => {
		params += field + '&'
	})
	if (params) params = '?fields='+params

	if (fields.length > 0) {
		//fetching data from server via api
		const res = await fetch(process.env.API_SERVER+process.env.API_ENDPOINTS.posts+`${params}/`)
		return await res.json() || []
	}
	else {
		const res = await fetch(process.env.API_SERVER+process.env.API_ENDPOINTS.posts+'/grouped/')
		return await res.json() || []
	}
}
