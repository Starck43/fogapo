import {Fragment, useEffect, useState} from "react"
import {useRouter} from "next/router"

import OnlineRegistration from "../forms/main"
import {HtmlContent} from "../UI/html-content"
import {AlertDialog} from "../UI/dialogs"
import Container from "../UI/container"

import DATA from "../../core/constants"


const Appeals = ({id, content, cost, reg_form, reg_is_active, events, isActive}) => {
	const [showForm, setShowForm] = useState(false)
	const router = useRouter()

	useEffect(() => {

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

	}, [router.asPath])


	const handleRegistrationClick = () => {
		setShowForm(!showForm)
	}

	return (
		<Fragment>
			<HtmlContent className="appeal-body container p-4 mx-auto">
				{content}
			</HtmlContent>

			{isActive &&
			<div
				className={`appeal-footer mt-4vh ${events.length === 0 ? "bg-white shadow4" : "mx-auto"}`}>
				<Container className="p-4">
					<div className="appeal-reg-info">
						<HtmlContent>{DATA.reg_content}</HtmlContent>
						<b>
							** Участие в мероприятии <span
							className="highlight">{`${cost ? "платное" : "бесплатное"}!`}</span>
						</b>
					</div>
					<div className="button" onClick={handleRegistrationClick}>Зарегистрироваться online</div>
				</Container>
				{events.length === 0 && <div className="overlay bg-color-brand"/>}
			</div>
			}

			{showForm
				? isActive
					? <OnlineRegistration
						id={id} show={showForm}
						regForm={reg_form}
						handler={handleRegistrationClick}
					/>

					: <AlertDialog
						title="Регистрация на мероприятие"
						show={showForm}
						handleClose={handleRegistrationClick}
						className="registration-finished"
					>
						<h4 className="title">Регистрация не доступна</h4>
						{reg_is_active
							? <p>Мероприятие уже завершилось!</p>
							: <p>Ожидайте начала регистрации!</p>
						}
					</AlertDialog>
				: null
			}

		</Fragment>

	)
}

export default Appeals
