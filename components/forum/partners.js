import {memo} from "react"
import {Logo} from "../UI/avatar"


function Partners({partners, showTitle = false, defaultType = "logo", ...props}) {
	if (!partners?.length) return null

	return (
		<div {...props}>
			{showTitle && <h3 className="partners-title title">{partners.length === 1 ? "Партнер" : "Партнеры"}</h3>}

			<ul className={`partners-list ${partners.length === 1 ? "logos" : "names"}-list`}>
				{partners.map(partner =>
					<li key={partner.id} className="partner">
						<Logo
							title={partner.name}
							href={partner.link}
							src={partners.length === 1 || defaultType === "logo" ? partner?.logo : undefined}
							className={`partner-${defaultType}`}
						/>
					</li>
				)}
			</ul>

		</div>
	)
}

export default memo(Partners)
