import { memo } from "react"
import Link from "next/link"

import ForumDate from "./forum-date"
import Calendar from "../calendar/calendar"
import { HtmlContent } from "../UI/html-content"
import { Logo } from "../UI/avatar"
import Countdown from "../UI/countdown"

import DATA, { HOME_TITLE } from "/core/constants"

import IconForum from "/public/logo.svg"
import Appeals from "./appeals"

function PostHeader(props) {
    const { id, subtitle, date_forum, add_logo, add_link, page_background } = props

    const datetime = date_forum && new Date(date_forum)
    const background = page_background || DATA.background

    return (
        <header className="post-header space-between bg-color-primary gap-4">
            <Calendar selectedId={id} />

            <div className="brand-header flex-wrap gap">
                <IconForum className="logo-svg" />

                <div className="brand-title">
                    <h1>{HOME_TITLE}</h1>
                    {subtitle && (
                        <HtmlContent as="span" className="subtitle highlight">
                            {subtitle}
                        </HtmlContent>
                    )}
                </div>

                {add_logo && (
                    <Logo
                        as={Link}
                        href={add_link || "#"}
                        className="logo-link extra"
                        src={add_logo}
                    />
                )}
            </div>

            {datetime && (
                <div className="header-info flex-column px-4vw gap">
                    <ForumDate datetime={datetime} />
                    <Countdown datetime={datetime} />
                </div>
            )}

            <section
                className="appeals-section bg-color-white"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "right bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}
            >
                <Appeals {...props} />
            </section>
        </header>
    )
}

export default memo(PostHeader)
