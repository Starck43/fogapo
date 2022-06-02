import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {HtmlContent} from "../UI/html-content"
import Container from "../UI/container"
import OnlineRegistration from "../forms/main"
import DATA from "../../core/constants"


const BodyContent = ({id, content, cost, isRegShow}) => {
	const [openRegForm, setOpenRegForm] = useState(false)
	const router = useRouter()

	useEffect(() => {
		//console.log(router);
		(router.asPath.startsWith(`/${router.query.id}?reg`)) && setOpenRegForm(!openRegForm)
		const link = document.getElementById('registration')
		link && link.addEventListener('click', handleClick)
		return () => link && link.removeEventListener('click', handleClick) || null
	}, [])

	const handleClick = (e) => {
		e.preventDefault()
		setOpenRegForm(!openRegForm)
	}

	return (
		<section className="appeals">
			<div className="appeals-container flex-column p-4 mx-auto">
				<HtmlContent>
					{content}
				</HtmlContent>
					<div className="appeal-footer large-text mt-4 mx-auto">
						<div className="appeal-reg-info">
							{ isRegShow && <HtmlContent>{DATA.reg_content}</HtmlContent> }
							<b>** Участие в мероприятии <span className="highlight">{`${cost ? 'платное' : 'бесплатное'}`}</span></b>
						</div>
						{ isRegShow && <div className="button" onClick={handleClick}>Зарегистрироваться online</div> }
					</div>
			</div>
			{
				openRegForm && <OnlineRegistration id={id} show={openRegForm} handler={setOpenRegForm}/>
			}
		</section>
	)
}

export default BodyContent
