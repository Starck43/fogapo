import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import Icon from "../UI/Icon"
import {HtmlContent} from "../UI/html-content"
import Container from "../UI/container"
import OnlineRegistration from "../forms/main"


const Appeals = ({post}) => {
	const [openRegForm, setOpenRegForm] = useState(false)
	const router = useRouter()

	useEffect(() => {
		//console.log(router);
		(router.asPath.startsWith(`/${router.query.slug}?reg`)) && setOpenRegForm(!openRegForm)
		const link = document.getElementById('registration')
		link.addEventListener('click', handleClick)
		return () => link.removeEventListener('click', handleClick)
	}, [])

	const handleClick = (e) => {
		e.preventDefault()
		setOpenRegForm(!openRegForm)
	}

	return (
		<section className="appeals">
			<Container className="container appeals-container flex-column p-4 mx-auto">
				<h2 className="mx-auto">
					<HtmlContent>{post.appeals_title}</HtmlContent>
				</h2>
				<ul className="appeals-block flex-wrap py-4">
					{
						post.appeals.map(appeal => (
							<li className="appeal p-2 cell-4" key={appeal.id}>
								{appeal.icon && <Icon src={appeal.icon} width="50" height="50"/>}
								{appeal.text && <HtmlContent className="text col-12">{appeal.text}</HtmlContent>}
							</li>
						))
					}
				</ul>
				<div className="appeal-footer large-text mx-auto">
					<HtmlContent className="appeal-reg-info">
						{post.appeals_footer}
					</HtmlContent>
					<div className="button" onClick={handleClick}>Зарегистрироваться online</div>
				</div>
			</Container>
			{
				openRegForm && <OnlineRegistration show={openRegForm} handler={setOpenRegForm}/>
			}
		</section>
	)
}

export default Appeals
