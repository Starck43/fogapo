import { AlertDialog } from "../UI/dialogs"
import { GroupItems } from "./group-items"
import { Accordion } from "react-bootstrap"
import { useFetch } from "../../core/Fetch"
import { TbLoader3 as Loader } from "react-icons/tb"
import Title from "../UI/title"

export function CalendarDialog({ expandedId, show, closeHandler }) {
    const { data, error } = useFetch(process.env.API_SERVER, process.env.API_ENDPOINTS.postsGrouped)

    if (error) {
        return <Title title="Ошибка загрузки мероприятий." subTitle="Попробуйте позже" />
    }

    return (
        <AlertDialog
            title="Календарь мероприятий"
            show={show}
            closeHandler={closeHandler}
            className="forum-calendar-modal"
            size="md"
            scrollable
        >
            {data ? (
                <>
                    {data.next_forums?.length ? (
                        <div className={`forum-group next`}>
                            {/*<h4 className="title">Предстоящие мероприятия</h4>*/}
                            <ul className="next-forums">
                                {data.next_forums.map((item, index) => (
                                    <GroupItems
                                        key={item.id}
                                        currentIndex={index}
                                        selected={expandedId}
                                        closeHandler={closeHandler}
                                        {...item}
                                    />
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {data.prev_forums?.length ? (
                        <div className={`forum-group prev`}>
                            <Accordion
                                className="prev-forums-accordion"
                                defaultActiveKey={expandedId.toString()}
                                alwaysOpen
                            >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <div className="title">Архив мероприятий</div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="prev-forums">
                                            {data.prev_forums.map((item, index) => (
                                                <GroupItems
                                                    key={item.id}
                                                    currentIndex={index}
                                                    selected={expandedId}
                                                    closeHandler={closeHandler}
                                                    {...item}
                                                />
                                            ))}
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    ) : null}
                </>
            ) : (
                <Loader className="loader-icon" />
            )}
        </AlertDialog>
    )
}
