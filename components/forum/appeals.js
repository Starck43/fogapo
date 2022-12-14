import {Fragment, memo, useCallback, useEffect, useState} from "react"
import {useRouter} from "next/router"

import OnlineRegistration from "../forms/main"
import {HtmlContent} from "../UI/html-content"
import {AlertDialog} from "../UI/dialogs"
import Container from "../UI/container"

import DATA from "../../core/constants"


const Appeals = (props) => {
	const {
		id,
		content,
		cost,
		reg_form,
		reg_is_active,
		events,
		isActive
	} = props
	const [showForm, setShowForm] = useState(false)
	const router = useRouter()

	const onCloseRegistration = useCallback(() => {
		setShowForm(false)
	}, [])


	const onOpenRegistration = useCallback(() => {
		setShowForm(true)
	}, [])


	useEffect(() => {

		if (router.asPath.endsWith(`?registration`)) {
			onOpenRegistration()
		}


		const link = document.getElementById("regLink")
		if (link) {
			link.addEventListener("click", onOpenRegistration)
			return () => link.removeEventListener("click", onOpenRegistration)
		}

	}, [router.asPath])


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
					<div
						className="button"
						onClick={onOpenRegistration}
					>
						Зарегистрироваться online
					</div>
				</Container>
				{events.length === 0 && <div className="overlay bg-color-brand"/>}
			</div>
			}

			{showForm
				? isActive
					? <OnlineRegistration
						id={id}
						show={showForm}
						regForm={reg_form}
						onClose={onCloseRegistration}
					/>

					: <AlertDialog
						title="Регистрация на мероприятие"
						show={showForm}
						closeHandler={onCloseRegistration}
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

export default memo(Appeals)
