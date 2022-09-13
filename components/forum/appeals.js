import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {HtmlContent} from "../UI/html-content"
import OnlineRegistration from "../forms/main"
import {AlertDialog} from "../UI/dialogs"

import DATA from "../../core/constants"


const BodyContent = ({id, content, cost, date_forum, reg_is_active, reg_form}) => {
	const [showForm, setShowForm] = useState(false)
	const [isRegOpen, setRegOpen] = useState(false)
	const router = useRouter()

	useEffect(() => {
		let curDate = new Date()
		let forumDate = new Date(date_forum)
		let available = reg_is_active && curDate <= forumDate
		setRegOpen(available)
		
		if (router.asPath.startsWith(`/${router.query.id}?reg`)) {
			setShowForm(true)
		}

		
/*		let openRegistration = () => setShowForm(true)
		
		const link = document.getElementById("registration")
		if (link) {
			link.addEventListener("click", openRegistration)
			return () => link.removeEventListener("click", openRegistration)
		}*/

	}, [])


	const handleRegistrationClick = () => {
		setShowForm(!showForm)
	}

	return (
		<section className="appeals">
			<div className="appeals-container flex-column p-4 mx-auto">
				
				<HtmlContent className="appeal-body">
					{content}
				</HtmlContent>
				
				{isRegOpen &&
				<div className="appeal-footer large-text mt-4 mx-auto">
					<div className="appeal-reg-info">
						<HtmlContent>{DATA.reg_content}</HtmlContent>
						<b>
							** Участие в мероприятии <span className="highlight">{`${cost ? "платное" : "бесплатное"}`}</span>
						</b>
					</div>
					<div className="button" onClick={handleRegistrationClick}>Зарегистрироваться online</div>
				</div>
				}
				
			</div>
			
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
		</section>
	)
}

export default BodyContent
