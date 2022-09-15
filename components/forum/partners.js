import {Logo} from "../UI/avatar"


export default function Partners({partners, showTitle = false, defaultType="logo", ...props}) {
	if (!partners?.length) return null

	return (
		<div {...props}>
			{showTitle && <h3 className="partners-title title">{partners.length === 1 ? "Партнер" : "Партнеры"}</h3>}

			<ul className={`partners-list ${partners.length === 1 ? "logos" : "names"}-list`}>
				{partners.map(partner =>
					<li key={partner.id} className="partner">
						<a href={partner.link} className="partner-link link">
							{partners.length === 1 || defaultType === 'logo'
								? <Logo className={`partner-logo centered`} name={partner.name} src={partner.logo}/>
								: <div className={`partner-name`}>{partner.name}</div>
							}
						</a>
					</li>
				)}
			</ul>

		</div>
	)
}
