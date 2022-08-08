import {useState} from "react"

import {RegistrationForm} from "./forms"
import ResponseContent from "./responseContent"
import {FORM_DATA, FORM_DATA_EXT} from "../../core/constants"
import {Fetch} from "../../core/Fetch"
import {AlertDialog, ModalDialog} from "../UI/dialogs"
import {Button, Modal} from "react-bootstrap"

//import style from "~/styles/reg.module.sass"


const OnlineRegistration = ({id, show, handler, reg_form}) => {
	const [respondedData, setRespondedData] = useState(null)
	const [validated, setValidated] = useState(false)

	const formData2Json = (form) => {
		let formData = new FormData(form)
		let data = Object.fromEntries(formData)
		let json = {}, text = "", num = 1, curQuestion, prevQuestion = null
		const REGEX = /questions[0-9]*/

		//console.log('form data:', data)

		Object.keys(data).forEach(key => {
			if (key.startsWith("questions")) {
				curQuestion = key.match(REGEX) // извлечем вопрос из названия вопроса или подвопроса
				let type = form.querySelector(`input[name="${key}"]`)?.type //определим тип input
				let subQuestionLabel = form.querySelector(`label[for="${key}"]`)?.innerText || ""

				if (!prevQuestion || curQuestion[0] !== prevQuestion[0]) {
					let questionLabel = form.querySelector(`label[for="${curQuestion}"]`)?.innerText || ""
					text += prevQuestion ? "\n\n" : ""
					text += `Вопрос ${num}: ${questionLabel}\nОтвет: `
					if (questionLabel === subQuestionLabel) {
						text += `${data[key]}\n`
					} else if (data[key]) {
						text += (type === "checkbox") ? `\n✅ ${data[key]}` : `[${subQuestionLabel}] - ${data[key]}`
						num--
					}
				} else {
					text += (data[key]) ? (type === "checkbox" ? `\n\n✅ ${data[key]}` : `, [${subQuestionLabel}] - ${data[key]}`) : ""
				}

				num++
				prevQuestion = curQuestion // сохраним ключ-вопрос
			} else {
				json[key] = data[key]
			}
		})
		json["questionnaire"] = text

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
				"Origin": process.env.SERVER,
				"Content-Type": "application/json",
				"Accept": "application/json, application/xml, text/plain, text/html",
			},
			body: JSON.stringify(data),
			//credentials: 'include',
		})

		setRespondedData(res)
		//console.log('result:',res)
		return res
	}


	const handleSubmit = (e) => {
		let form = e.target.parentNode.parentNode.querySelector("form")

		if (form.checkValidity() === false) {
			e.preventDefault()
			e.stopPropagation()
			setValidated(true)
			let invalid = form.querySelector(":invalid")
			if (invalid) {
				invalid.scrollIntoView({behavior: "smooth"})
				invalid.focus()
			}
		} else {
			setRespondedData(uploadData(form))
		}
	}


	const handleClose = () => handler(false)


	if (respondedData instanceof Promise) return (
		<AlertDialog title="Регистрация на мероприятие" show={show} closeHandler={handler}>
			<h4 className="title">Связь с сервером...</h4>
		</AlertDialog>
	)

	else if (respondedData && respondedData?.data.status !== -1 && !respondedData?.error) return (
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
			<ResponseContent data={respondedData?.data}/>
		</AlertDialog>
	)

	else if (typeof respondedData === "undefined") return (
		<AlertDialog
			title={`Заявка отправлена!`}
			show={show}
			closeHandler={handler}
			footer={
				<Modal.Footer className="centered">
					<Button variant="secondary" type="button" onClick={handleClose}>Закрыть</Button>
					<span
						className="message status-error"> Ответ сервера: undefined<br/>Internal server error 500</span>
				</Modal.Footer>
			}
			className="registration"
		>
			<h4>Регистрация прошла с ошибками на сервере</h4>
			<p>Рекомендуем сообщить об этом <a href="mailto:webmaster@istarck.ru">администратору сайта</a></p>
		</AlertDialog>
	)

	else if (respondedData?.data && (respondedData?.data.status === -1 || respondedData?.error)) return (
		<AlertDialog
			title="Ошибка регистрации"
			show={show}
			closeHandler={handler}
			footer={
				<Modal.Footer>
					<span className="status-message error centered">
						{respondedData?.response ? `Код ошибки: ${respondedData?.response?.status}` : "Ошибка структуры данных. Обратитесь к администратору сайта!"}
					</span>
				</Modal.Footer>
			}
			className="registration-error"
		>
			<h4 className="title">Возникла ошибка на сервере!</h4>
			<p>{respondedData?.response?.text}</p>
		</AlertDialog>
	)

	else return (
			<ModalDialog
				title="Регистрация на мероприятие"
				show={show}
				closeHandler={handleClose}
				className="registration"
				size="md"
			>
				<RegistrationForm id={id} data={reg_form === 1 ? FORM_DATA_EXT : FORM_DATA} submitHandler={handleSubmit}
				                  closeHandler={handleClose} validated={validated}/>
			</ModalDialog>
		)
}

export default OnlineRegistration


