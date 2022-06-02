import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {HtmlContent, HtmlBodyContent} from "../UI/html-content"
import Container from "../UI/container"
import OnlineRegistration from "../forms/main"
import DATA from "../../core/constants"


const BodyContent = ({content, cost, showRegistration}) => {
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
			<Container className="container appeals-container flex-column p-4 mx-auto">
				<HtmlBodyContent>
					{content}
				</HtmlBodyContent>
				{
				showRegistration && (
					<div className="appeal-footer large-text mx-auto">
						<div className="appeal-reg-info">
							<HtmlContent>{DATA.reg_content}</HtmlContent>
							<p>Участие в мероприятии <span className="highlight">{`${cost ? 'платное' : 'бесплатное'}`}</span></p>
						</div>
						<div className="button" onClick={handleClick}>Зарегистрироваться online</div>
					</div>
					)
				}
			</Container>
			{
				openRegForm && <OnlineRegistration show={openRegForm} handler={setOpenRegForm}/>
			}
		</section>
	)
}

export default BodyContent
