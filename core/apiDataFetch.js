import {Fetch} from "./Fetch"

export const apiDataFetch = function (server, endpoint, params = {}) {
	const {data, error} = Fetch(server, endpoint, params)
	return {data, error}
}
