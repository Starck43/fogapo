import Icon from "../UI/Icon"
import {HtmlContent} from "../UI/html-content"

const Appeals = ({post}) => {
	const regHandle = (e) => {
		console.log(e.target)
	}

	return (
		<section className="appeals-container flex-column p-4">
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
				<HtmlContent>
					{post.appeals_footer}
				</HtmlContent>
				<div className="button" onClick={regHandle}>Зарегистрироваться online</div>
			</div>
		</section>
	)
}

export default Appeals
