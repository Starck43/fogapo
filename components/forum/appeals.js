import { Fragment, memo, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"

import OnlineRegistration from "../forms/main"
import { HtmlContent } from "../UI/html-content"
import { AlertDialog } from "../UI/dialogs"
import Container from "../UI/container"

import DATA from "../../core/constants"
import Title from "../UI/title"

const Appeals = (props) => {
    const { id, content, date_forum, cost, reg_form, reg_is_active, events, isActive } = props
    const [showForm, setShowForm] = useState(false)
    const router = useRouter()

    const onCloseRegistration = useCallback(() => {
        setShowForm(false)
    }, [])

    const onOpenRegistration = useCallback(() => {
        setShowForm(true)
    }, [])

    useEffect(() => {
        if (!date_forum || !reg_is_active) return

        if (router.asPath.endsWith(`?registration`)) {
            onOpenRegistration()
        }

        const link = document.getElementById("regLink")
        if (link) {
            link.addEventListener("click", onOpenRegistration)
            return () => link.removeEventListener("click", onOpenRegistration)
        }
    }, [date_forum, onOpenRegistration, reg_is_active, router.asPath])

    if (!date_forum) {
        return (
            <Title
                title="Пока новых мероприятий не запланировано."
                subTitle="Загляните позже!"
                as={"h4"}
                className="p-4 m-0"
            />
        )
    }

    return (
        <Fragment>
            <HtmlContent className="appeal-body container p-4 mx-auto">{content}</HtmlContent>

            {isActive && (
                <div
                    className={`appeal-footer mt-4vh ${
                        !events.length ? "bg-white shadow4" : "mx-auto"
                    }`}
                >
                    <Container className="p-4">
                        <div className="appeal-reg-info">
                            <HtmlContent>{DATA.reg_content}</HtmlContent>
                            <b>
                                ** Участие в мероприятии{" "}
                                <span className="highlight">{`${
                                    cost ? "платное" : "бесплатное"
                                }!`}</span>
                            </b>
                        </div>
                        <div className="button" onClick={onOpenRegistration}>
                            Зарегистрироваться online
                        </div>
                    </Container>
                    {!events.length ? <div className="overlay bg-color-brand" /> : null}
                </div>
            )}

            {showForm ? (
                isActive ? (
                    <OnlineRegistration
                        id={id}
                        show={showForm}
                        regForm={reg_form}
                        onClose={onCloseRegistration}
                    />
                ) : (
                    <AlertDialog
                        title="Регистрация на мероприятие"
                        show={showForm}
                        closeHandler={onCloseRegistration}
                        className="registration-finished"
                    >
                        <h4 className="title">Регистрация не доступна</h4>
                        {reg_is_active ? (
                            <p>Мероприятие уже завершилось!</p>
                        ) : (
                            <p>Ожидайте начала регистрации!</p>
                        )}
                    </AlertDialog>
                )
            ) : null}
        </Fragment>
    )
}

export default memo(Appeals)
