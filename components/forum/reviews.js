import {tripQuotes} from "../../core/utils"


export default function Reviews({reviews, ...props}) {
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
						<span className="review-owner">{review.visitor.name}</span>
					</blockquote>}
				</li>
			)}
		</ul>
	)
}