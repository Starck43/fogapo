import {useEffect, useState} from "react"
import {useRouter} from "next/router"

import OnlineRegistration from "../forms/main"
import {HtmlContent} from "../UI/html-content"
import {AlertDialog} from "../UI/dialogs"
import Container from "../UI/container"

import DATA from "../../core/constants"


const Appeals = ({id, content, cost, date_forum, reg_is_active, reg_form, ...props}) => {
	const [showForm, setShowForm] = useState(false)
	const [isRegOpen, setRegOpen] = useState(true)
	const router = useRouter()

	useEffect(() => {
		let curDate = new Date()
		let forumDate = new Date(date_forum)
		let available = reg_is_active && curDate < forumDate
		//console.log(reg_is_active, forumDate)
		setRegOpen(available)

		if (router.asPath.endsWith(`?registration`)) {
			setShowForm(true)
		}

		// for external links pressed
		let openRegistration = () => {
			setShowForm(true)
		}

		const link = document.getElementById("regLink")
		if (link) {
			link.addEventListener("click", openRegistration)
			return () => link.removeEventListener("click", openRegistration)
		}

	}, [date_forum, reg_is_active, router.asPath])


	const handleRegistrationClick = () => {
		setShowForm(!showForm)
	}

	return (
		<Container {...props}>
			<HtmlContent className="appeal-body">
				{content}
			</HtmlContent>

			{isRegOpen &&
			<div className="appeal-footer mt-4 mx-auto">
				<div className="appeal-reg-info">
					<HtmlContent>{DATA.reg_content}</HtmlContent>
					<b>
						** Участие в мероприятии <span
						className="highlight">{`${cost ? "платное" : "бесплатное"}!`}</span>
					</b>
				</div>
				<div className="button" onClick={handleRegistrationClick}>Зарегистрироваться online</div>
			</div>
			}

			{showForm
				? isRegOpen
					? <OnlineRegistration id={id} show={showForm} handler={handleRegistrationClick} regForm={reg_form}/>
					: <AlertDialog
						title="Регистрация на мероприятие"
						show={showForm}
						handleClose={handleRegistrationClick}
						className="registration-finished"
					>
						<h4 className="title">Регистрация не доступна</h4>
						{reg_is_active
							? <p>Мероприятие уже завершилось!</p>
							: <p>Ожидайте открытия регистрации!</p>
						}
					</AlertDialog>
				: null
			}
		</Container>
	)
}

export default Appeals
