import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {HtmlContent} from "../UI/html-content"
import OnlineRegistration from "../forms/main"
import DATA from "../../core/constants"
import {AlertDialog} from "../UI/dialogs"


const BodyContent = ({id, content, cost, isRegShow, reg_form}) => {
	const [openRegForm, setOpenRegForm] = useState(false)
	const router = useRouter()

	useEffect(() => {
		//console.log(router);
		(router.asPath.startsWith(`/${router.query.id}?reg`)) && setOpenRegForm(!openRegForm)
		const link = document.getElementById("registration")
		link && link.addEventListener("click", handleRegistrationClick)
		return () => link && link.removeEventListener("click", handleRegistrationClick) || null
	}, [router.query.id])

	const handleRegistrationClick = (e) => {
		e.preventDefault()
		setOpenRegForm(true)
	}

	return (
		<section className="appeals">
			<div className="appeals-container flex-column p-4 mx-auto">
				<HtmlContent className="appeal-body">
					{content}
				</HtmlContent>
				{isRegShow &&
				<div className="appeal-footer large-text mt-4 mx-auto">
					<div className="appeal-reg-info">
						<HtmlContent>{DATA.reg_content}</HtmlContent>
						<b>** Участие в мероприятии <span
							className="highlight">{`${cost ? "платное" : "бесплатное"}`}</span></b>
					</div>
					<div className="button" onClick={handleRegistrationClick}>Зарегистрироваться online</div>
				</div>
				}
			</div>
			{
				openRegForm
					? isRegShow
						? <OnlineRegistration id={id} show={openRegForm} handler={setOpenRegForm} reg_form={reg_form}/>
						: <AlertDialog
							title="Регистрация на мероприятие"
							show={openRegForm}
							closeHandler={setOpenRegForm}
							className="registration-finished"
						>
							<h4 className="title">Регистрация не доступна</h4>
							<p>Мероприятие уже завершилось!</p>
						</AlertDialog>
					: null
			}
		</section>
	)
}

export default BodyContent
