import { memo } from "react"
import { Logo } from "../UI/avatar"
import Title from "../UI/title"

function Partners({ partners, showTitle = false, defaultType = "logo", className = "" }) {
    if (!partners?.length) return null

    return (
        <div className={className}>
            {showTitle && (
                <Title
                    className="partners-title"
                    title={partners.length === 1 ? "Партнер" : "Партнеры"}
                />
            )}

            <ul className={`partners-list ${partners.length === 1 ? "logos" : "names"}-list`}>
                {partners.map((partner) => (
                    <li key={partner.id} className="partner">
                        <Logo
                            title={partner.name}
                            href={partner.link}
                            src={
                                partners.length === 1 || defaultType === "logo"
                                    ? partner?.logo
                                    : undefined
                            }
                            className={`partner-${defaultType}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default memo(Partners)
