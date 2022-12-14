import {memo, useCallback, useState} from "react"

import {RegistrationForm} from "./forms"
import ResponseContent from "./responseContent"
import {FORM_DATA, FORM_DATA_EXT} from "../../core/constants"
import {AlertDialog, ModalDialog} from "../UI/dialogs"
import {Button, Modal} from "react-bootstrap"
import {fetchFormData} from "./helpers/fetchFormData"

//import style from "~/styles/reg.module.sass"

const OnlineRegistration = ({id, show, onClose, regForm}) => {
	const [respondedData, setRespondedData] = useState(null)
	const [validated, setValidated] = useState(false)

/*
	const setResponse = useCallback(() => (response) => {
		setRespondedData(response)
	},[])
*/

	const handleSubmit = useCallback( async (e) => {
		const form = e.target.parentNode.parentNode.querySelector("form")
		e.preventDefault()
		e.stopPropagation()

		if (form.checkValidity() === false) {
			setValidated(true)
			const invalid = form.querySelector(":invalid")
			if (invalid) {
				invalid.scrollIntoView({behavior: "smooth"})
				invalid.focus()
			}
		} else {
			const data = await fetchFormData(form)
			setRespondedData(data)
		}
	}, [])


	//const closeHandler = useCallback(() => onClose?.(false), [onClose])

	console.log("res:", respondedData)

	if (respondedData instanceof Promise) {
		return (
			<AlertDialog title="Регистрация на мероприятие" show={show} closeHandler={onClose}>
				<h4 className="title">Связь с сервером...</h4>
			</AlertDialog>
		)
	} else if (respondedData && respondedData?.data.status !== -1 && !respondedData?.error) return (
		<AlertDialog
			title={`Заявка ${respondedData.data?.status === 0 ? "успешно отправлена" : "уже существует"}!`}
			show={show}
			closeHandler={onClose}
			footer={
				<Modal.Footer className="centered">
					<Button variant="secondary" type="button" onClick={onClose}>Закрыть</Button>
				</Modal.Footer>
			}
			className="registration"
		>
			<ResponseContent data={respondedData?.data}/>
		</AlertDialog>
	)

	else if (typeof respondedData === "undefined") return (
		<AlertDialog
			title={`Заявка отправлена с ошибкой!`}
			show={show}
			closeHandler={onClose}
			footer={
				<Modal.Footer className="centered">
					<Button variant="secondary" type="button" onClick={onClose}>Закрыть</Button>
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
			closeHandler={onClose}
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
				closeHandler={onClose}
				className="registration"
				size="md"
			>
				<RegistrationForm
					id={id}
					data={regForm === 1 ? FORM_DATA_EXT : FORM_DATA}
					submitHandler={handleSubmit}
					closeHandler={onClose}
					validated={validated}
				/>
			</ModalDialog>
		)
}

export default memo(OnlineRegistration)
