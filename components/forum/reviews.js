import Container from "../UI/container"
import {tripQuotes} from "../../core/utils"
import {memo} from "react"
import {HtmlContent} from "../UI/html-content"


function Reviews({reviews, ...props}) {
	return (
		<Container {...props}>
			<h3 className="title review-title">Отзывы</h3>
			{reviews.map((review) => {
				const reviewAuthor = <span className="review-author">{review.visitor?.name || review.author}</span>
				return (
					<div className="review" key={review.id}>
						{
							review.content && <blockquote className="review-content frame">
								&ldquo;
								<i>{tripQuotes(review.content)}</i>
								&rdquo;
								<br/>
								{review.link
									? <a href={review.link} className="link no-decoration">
										{reviewAuthor}
									</a>
									: reviewAuthor
								}
							</blockquote>
						}
					</div>
				)
			})}
		</Container>
	)
}

export default memo(Reviews)
