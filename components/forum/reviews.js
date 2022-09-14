import {tripQuotes} from "../../core/utils"


export default function Reviews({reviews, ...props}) {
	const reviewAuthor = (name) => <span className="review-author">{name}</span>
	return (
		<ul {...props}>
			<h3 className="title">Отзывы</h3>
			{reviews.map(review =>
				<li className="review" key={review.id}>
					{review.content && <blockquote className="review-content">
						&ldquo;
						<i>{tripQuotes(review.content)}</i>
						&rdquo;
						<br/>
						{review.link
							? <a href={review.link} className="link no-decoration">
								{reviewAuthor(review.visitor?.name || review.author)}
							</a>
							: reviewAuthor(review.visitor?.name || review.author)
						}
					</blockquote>}
				</li>
			)}
		</ul>
	)
}