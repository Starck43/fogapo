import { AlertDialog } from "../UI/dialogs"
import { GroupItems } from "./group-items"
import { Accordion } from "react-bootstrap"
import { useFetch } from "../../core/Fetch"
import SubTitle from "../UI/subtitle"
import { TbLoader3 as Loader } from "react-icons/tb"

export function CalendarDialog({ expandedId, show, closeHandler }) {
    const { data, error } = useFetch(process.env.API_SERVER, process.env.API_ENDPOINTS.postsGrouped)

    if (error) {
        return <SubTitle>Ошибка загрузки мероприятий. Попробуйте позже!</SubTitle>
    }

    const { prev_forums, next_forums } = data

    return (
        <AlertDialog
            title="Календарь мероприятий"
            show={show}
            closeHandler={closeHandler}
            className="events-calendar-modal"
            size="md"
            scrollable
        >
            {data ? (
                <>
                    <div className={`forum-group next`}>
                        {/*<h4 className="title">Предстоящие мероприятия</h4>*/}
                        <ul className="next-forums">
                            {next_forums?.map((item, index) => (
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
                                        {prev_forums?.map((item, index) => (
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
                </>
            ) : (
                <Loader className="loader-icon" />
            )}
        </AlertDialog>
    )
}
