import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

const fetcher = url => fetch(url).then(res => res.json())

export const Fetch = (server, endpoint, params = {}) => {
	let url = server + endpoint
	if (!url) return {data: null, error: 'Пустой запрос к серверу'}

	if (Object.keys(params).length) {
		params = new URLSearchParams(params)
		url = url + '?' + params.toString()
	}

	const {data, error} = useSWR(url, fetcher)
	return {data, error}
}



export const PaginateFetch = (server, endpoint, PAGE_SIZE = 10) => {
	let url = server + endpoint
	if (!url) return {posts: [], error: 'Пустой запрос к серверу'}


	const { data, error, size, setSize } = useSWRInfinite(
		(index) => `${url}?per_page=${PAGE_SIZE}&page=${index + 1}`,
		fetcher
	)

	let posts = [], isLoadingMore=null, isReachingEnd=null
	if (data) {
		posts = [].concat(...data)

		let isLoadingInitialData = !data && !error
		isLoadingMore = isLoadingInitialData || (size > 0 && typeof data[size - 1] === "undefined")

		const isEmpty = data?.[0]?.length === 0
		isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
	}

	return { posts, error, size, setSize, isLoadingMore, isReachingEnd }
}