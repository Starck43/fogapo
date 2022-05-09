import React, {useState} from 'react'

import RegistrationForm from "./forms"
import ResponseContent from "./responseContent"
import {FORM_DATA} from "../../core/constants"
import {Fetch} from "../../core/Fetch"
import {AlertDialog, ModalDialog} from "../UI/dialogs"
import {Button} from "react-bootstrap"

//import style from "~/styles/reg.module.sass"


const OnlineRegistration = ({show, handler}) => {
	const [respondedData, setRespondedData] = useState(null)
	const [validated, setValidated] = useState(false)

	const formData2Json = (form) => {
		let formData = new FormData(form)
		let data = Object.fromEntries(formData)
		let json = {}, text = '', num = 1
		//console.log('form data:', data)

		Object.keys(data).forEach(key => {
			let isQuestion = (key.search(/^questions/g) !== -1)
			if (isQuestion) {
				let label = form.querySelector(`label[for="${key}"]`)
				text += `Вопрос ${num}: ${label?.innerText}\nОтвет: ${data[key]}\n\n`
				num++
			} else {
				json[key] = data[key]
			}
		})
		json['questionnaire'] = text

		return json
	}

	const uploadData = async (form) => {
		let data = formData2Json(form) // конвертируем данные формы в json

		const res = await Fetch(process.env.API_SERVER, process.env.API_ENDPOINTS.saveUser, {}, {
			method: "post",
			headers: {
				//'Content-Type': 'application/x-www-form-urlencoded',
				//'Content-Type': 'multipart/form-data',
				'Content-Type': 'application/json',
				'Accept': 'application/json, application/xml, text/plain, text/html',
			},
			body: JSON.stringify(data),
			credentials: 'same-origin',
		})

		setRespondedData(res)
		//console.log('result:',res)
		return res
	}

	const handleSubmit = (e) => {
		let form = e.target.parentNode.parentNode.querySelector('form')

		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			setValidated(true)
		} else {
			setRespondedData(uploadData(form))
		}
	}

	const handleClose = (e) => {
		handler(false)
	}


	if (respondedData instanceof Promise)
		return <AlertDialog title="Регистрация на мероприятие" show={show} closeHandler={handler}>
			<h4 className="title">Связь с сервером...</h4>
		</AlertDialog>

	if (respondedData && !respondedData.error)
		return <AlertDialog title="Регистрация на мероприятие" show={show} closeHandler={handler}
		                    status={`Заявка ${respondedData.data.status === 0 ? "успешно отправлена" : "уже существует"}!`}>
			<ResponseContent data={respondedData.data}/>
		</AlertDialog>

	if (respondedData && respondedData.error)
		return <AlertDialog title="Регистрация на мероприятие" show={show} closeHandler={handler}
		                    status={respondedData.data.status}>
			<h4 className="title">Возникла ошибка на сервере!</h4>
			<ResponseContent data={respondedData.response.text}/>
		</AlertDialog>

	return (
		<ModalDialog title="Регистрация нового участника" show={show} submitHandler={handleSubmit}
		             closeHandler={handleClose} footer={
						 <>
							 <Button variant="primary" type="submit" onClick={handleSubmit}>Отправить</Button>
							 <Button variant="secondary" type="button" onClick={handleClose}>Отменить</Button>

						 </>
		}>
			<RegistrationForm data={FORM_DATA} validated={validated}/>
		</ModalDialog>
	)
}

export default OnlineRegistration


