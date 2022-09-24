import {Fragment, useEffect, useState} from "react"
import {useRouter} from "next/router"

import OnlineRegistration from "../forms/main"
import {HtmlContent} from "../UI/html-content"
import {AlertDialog} from "../UI/dialogs"
import Container from "../UI/container"

import DATA from "../../core/constants"


const Appeals = ({id, content, cost, reg_form, events, isActive}) => {
	const [showForm, setShowForm] = useState(false)
	const [isRegOpen, setRegOpen] = useState(true)
	const router = useRouter()

	useEffect(() => {

		//console.log(reg_is_active, forumDate)
		setRegOpen(isActive)

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

	}, [isActive, router.asPath])


	const handleRegistrationClick = () => {
		setShowForm(!showForm)
	}

	return (
		<Fragment>
			<HtmlContent className="appeal-body container p-4 mx-auto">
				{content}
			</HtmlContent>

			{isRegOpen &&
			<div
				className={`appeal-footer ${events.length === 0 ? "bg-white shadow4 p-4 mt-4vh" : "mt-4 mx-auto"}`}>
				<Container>
					<div className="appeal-reg-info">
						<HtmlContent>{DATA.reg_content}</HtmlContent>
						<b>
							** Участие в мероприятии <span
							className="highlight">{`${cost ? "платное" : "бесплатное"}!`}</span>
						</b>
					</div>
					<div className="button" onClick={handleRegistrationClick}>Зарегистрироваться online</div>
				</Container>
				<div className={`overlay ${events.length === 0 ? "bg-color-brand" : ""}`}/>
			</div>
			}

			{showForm
				? isRegOpen
					? <OnlineRegistration id={id} show={showForm} handler={handleRegistrationClick}
					                      regForm={reg_form}/>
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

		</Fragment>

	)
}

export default Appeals
