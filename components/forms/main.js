import React, {useState} from 'react'

import {RegistrationForm} from "./forms"
import ResponseContent from "./responseContent"
import {FORM_DATA} from "../../core/constants"
import {Fetch} from "../../core/Fetch"
import {AlertDialog, ModalDialog} from "../UI/dialogs"
import {Button, Modal} from "react-bootstrap"

//import style from "~/styles/reg.module.sass"


const OnlineRegistration = ({show, handler}) => {
	const [respondedData, setRespondedData] = useState(null)
	const [validated, setValidated] = useState(false)

	const formData2Json = (form) => {
		let formData = new FormData(form)
		let data = Object.fromEntries(formData)
		let json = {}, text = '', num = 1, curQuestion, prevQuestion=null
		const REGEX = /questions[0-9]*/

		//console.log('form data:', data)

		Object.keys(data).forEach(key => {
			if (key.startsWith("questions")) {
				curQuestion = key.match(REGEX) // извлечем вопрос из названия вопроса или подвопроса
				let type = form.querySelector(`input[name="${key}"]`)?.type //определим тип input
				let subQuestionLabel = form.querySelector(`label[for="${key}"]`)?.innerText || ""

				if (!prevQuestion || curQuestion[0] !== prevQuestion[0]) {
					let questionLabel = form.querySelector(`label[for="${curQuestion}"]`)?.innerText || ""
					text += prevQuestion ? '\n\n' : ""
					text += `Вопрос ${num}: ${questionLabel}\nОтвет: `
					if (questionLabel == subQuestionLabel) {
						text += `${data[key]}\n`
					} else {
						text += (type == "checkbox") ? `\n✅ ${data[key]}` : `[${subQuestionLabel}] - ${data[key]}`
					}
				} else
				{
					text += (data[key]) ? (type == "checkbox" ? `\n✅ ${data[key]}` : `, [${subQuestionLabel}] - ${data[key]}`) : ""
					num--
				}

				num++
				prevQuestion = curQuestion // сохраним ключ-вопрос
			} else {
				json[key] = data[key]
			}
		})
		json['questionnaire'] = text

		return json
	}

	const uploadData = async (form) => {
		let data = formData2Json(form) // конвертируем данные формы в json
		//console.log(data)
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
			e.preventDefault()
			e.stopPropagation()
			setValidated(true)
			let invalid = form.querySelector(':invalid')
			if (invalid) {
				invalid.scrollIntoView({behavior: "smooth"})
				invalid.focus()
			}
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

	if (respondedData && respondedData.error) return (
		<AlertDialog
			title="Регистрация на мероприятие"
			show={show}
			closeHandler={handler}
			footer={
				<Modal.Footer>
					<span className="status-message error centered">
						{`Код ошибки: ${respondedData.response.status}`}
					</span>
				</Modal.Footer>
			}
			className="registration-error"
		>
			<h4 className="title">Возникла ошибка на сервере!</h4>
			<ResponseContent data={respondedData.response.text}/>
		</AlertDialog>
	)

	if (respondedData?.data && !respondedData.error) return (
		<AlertDialog
			title={`Заявка ${respondedData.data?.status === 0 ? "успешно отправлена" : "уже существует"}!`}
			show={show}
			closeHandler={handler}
			footer={
				<Modal.Footer className="centered">
					<Button variant="secondary" type="button" onClick={handleClose}>Закрыть</Button>
				</Modal.Footer>
			}
			className="registration"
		>
			<ResponseContent data={respondedData.data}/>
		</AlertDialog>
		)

	return (
		<ModalDialog
			title="Регистрация нового участника"
			show={show}
			closeHandler={handleClose}
			className="registration"
		>
			<RegistrationForm data={FORM_DATA} submitHandler={handleSubmit} closeHandler={handleClose} validated={validated}/>
		</ModalDialog>
	)
}

export default OnlineRegistration


