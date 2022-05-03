import {Logo} from "../UI/avatar"
import {Fragment} from "react"


export default function Partners({className='', partners=null, fields = ['name']}) {
	return (
		partners &&
		<ul className={`partners ${className}`}>
			{
				partners.map(partner => (
					<li key={partner.id} className="partner-block">
						{
							fields.map((field,index) => (
								<Fragment key={index}>
									{field === 'logo' &&
									<Logo className={`partner-${field} centered`} name={partner.name} src={partner.logo}/>}
									{field === 'name' && <div className={`partner-${field}`}>{partner.name}</div>}
								</Fragment>
							))

						}
					</li>
				))
			}
		</ul>
	)
}
