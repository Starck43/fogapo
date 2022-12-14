import {Fetch} from "../../../core/Fetch"
import {formData2Json} from "./formData2Json"


export const fetchFormData = async (form, callback = undefined) => {
	let data = formData2Json(form) // конвертируем данные формы в json
	//console.log(data)
	const res = await Fetch(process.env.API_SERVER, process.env.API_ENDPOINTS.saveUser, {}, {
		method: "post",
		headers: {
			"Origin": process.env.SERVER,
			"Content-Type": "application/json",
			"Accept": "application/json, application/xml, text/plain, text/html",
		},
		body: JSON.stringify(data),
		//credentials: 'include',
	})

	callback?.(res)
	return res
}
