import Icon from "../UI/Icon"
import {HtmlContent} from "../UI/html-content"
import Container from "../UI/container"


const Appeals = ({post}) => {
	const regHandle = (e) => {
		console.log(e.target)
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
					<div className="button" onClick={regHandle}>Зарегистрироваться online</div>
				</div>
			</Container>
		</section>
	)
}

export default Appeals
