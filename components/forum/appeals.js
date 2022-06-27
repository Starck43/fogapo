import React, {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {HtmlContent} from "../UI/html-content"
import Container from "../UI/container"
import OnlineRegistration from "../forms/main"
import DATA from "../../core/constants"
import {AlertDialog} from "../UI/dialogs"
import {Modal} from "react-bootstrap"


const BodyContent = ({id, content, cost, isRegShow, reg_form}) => {
	const [openRegForm, setOpenRegForm] = useState(false)
	const router = useRouter()

	useEffect(() => {
		//console.log(router);
		(router.asPath.startsWith(`/${router.query.id}?reg`)) && setOpenRegForm(!openRegForm)
		const link = document.getElementById("registration")
		link && link.addEventListener("click", handleClick)
		return () => link && link.removeEventListener("click", handleClick) || null
	}, [])

	const handleClick = (e) => {
		e.preventDefault()
		setOpenRegForm(!openRegForm)
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
					<div className="button" onClick={handleClick}>Зарегистрироваться online</div>
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
							<h4 className="title">Регистрация уже не доступна!</h4>
							<p>Мероприятие завершено.</p>
						</AlertDialog>
					: null
			}
		</section>
	)
}

export default BodyContent
