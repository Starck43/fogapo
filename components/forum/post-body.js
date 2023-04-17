import { memo, useEffect, useState } from "react"

import Appeals from "./appeals"
import Events from "./events"
import Partners from "./partners"
import Contacts from "./contacts"
import Reviews from "./reviews"
import Container from "../UI/container"
import DATA from "../../core/constants"

function PostBody(props) {
    const {
        date_forum,
        events,
        location,
        info,
        partners,
        reviews,
        reg_is_active,
        page_background,
    } = props
    const [isActive, setActive] = useState(false)

    const background = page_background || DATA.background

    useEffect(() => {
        if (date_forum) {
            let curDate = new Date()
            let forumDate = new Date(date_forum)
            setActive(reg_is_active && curDate < forumDate)
        }
    }, [date_forum, reg_is_active])

    return (
        <main
            className="post post-body"
            style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: "right bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
            }}
        >
            <section
                className={`appeals-forum bg-color-secondary ${
                    events?.length === 0 ? "pt-4vh" : "py-4vh"
                }`}
            >
                <Appeals isActive={isActive} {...props} />
            </section>

            {events?.length ? (
                <section className="events-forum bg-color-brand shadow4 py-4vh">
                    <Events events={events} className="events-container px-4vw my-4" />
                </section>
            ) : null}

            {partners?.length || location || info ? (
                <section className="info-forum bg-color-secondary py-4vh">
                    <Container className="info-container px-4vw flex-wrap">
                        <Partners
                            partners={partners}
                            showTitle
                            defaultType="name"
                            className="partners-block my-4"
                        />
                        <Contacts
                            location={location}
                            info={info}
                            isActive={isActive}
                            className="contacts-block flex-column my-4"
                        />
                    </Container>
                </section>
            ) : null}

            {reviews?.length ? (
                <section className="reviews-forum bg-color-primary py-4vh">
                    <Reviews reviews={reviews} className="reviews-container px-4vw my-4" />
                </section>
            ) : null}
        </main>
    )
}

export default memo(PostBody)
