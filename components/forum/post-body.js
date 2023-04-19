import { memo, useEffect, useState } from "react"

import Appeals from "./appeals"
import Events from "./events"
import Partners from "./partners"
import Contacts from "./contacts"
import Reviews from "./reviews"
import Container from "../UI/container"
import DATA from "../../core/constants"

function PostBody(props) {
    const { events, date_forum, location, info, partners, reviews, page_background } = props

    return (
        <main className="post-body">
            {events?.length ? (
                <section className="events-section bg-color-brand shadow4">
                    <Events
                        events={events}
                        className="container events-container px-4vw flex-column center gap"
                    />
                </section>
            ) : null}

            {partners?.length || location || info ? (
                <section className="extra-section bg-color-secondary py-4vh">
                    <Container className="info-container px-4vw flex-wrap gap">
                        <Partners
                            partners={partners}
                            showTitle
                            defaultType="name"
                            className="partners-block my-4"
                        />
                        <Contacts
                            location={location}
                            info={info}
                            date_forum={date_forum}
                            className="contacts-block flex-column my-4"
                        />
                    </Container>
                </section>
            ) : null}

            {reviews?.length ? (
                <section className="reviews-section bg-color-primary py-4vh">
                    <Reviews reviews={reviews} className="reviews-container px-4vw my-4" />
                </section>
            ) : null}
        </main>
    )
}

export default memo(PostBody)
