import { Fragment, memo, useCallback, useState } from "react"

import { AiFillCalendar as CalendarIcon } from "react-icons/ai"
import { TbLoader3 as Loader } from "react-icons/tb"
import { Accordion } from "react-bootstrap"

import Items from "./group-items"
import { AlertDialog } from "../UI/dialogs"
import { Fetch, useFetch } from "../../core/Fetch"
import SubTitle from "../UI/subtitle"
import { CalendarDialog } from "./calendar-dialog"

const Calendar = ({ selectedId = 0 }) => {
    const [show, setShow] = useState(false)
    const handleCloseDialog = useCallback(() => {
        setShow(!show)
    }, [show])

    return (
        <Fragment>
            <div className="calendar-button centered" onClick={handleCloseDialog}>
                <CalendarIcon />
                <span>Календарь мероприятий</span>
            </div>

            {show && (
                <CalendarDialog
                    expandedId={selectedId}
                    show={show}
                    closeHandler={handleCloseDialog}
                />
            )}
        </Fragment>
    )
}

export default memo(Calendar)
