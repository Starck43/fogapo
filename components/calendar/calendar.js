import { memo, useCallback, useState } from "react"
import { AiFillCalendar as CalendarIcon } from "react-icons/ai"

import { CalendarDialog } from "./calendar-dialog"

const Calendar = ({ selectedId = 0 }) => {
    const [show, setShow] = useState(false)
    const handleCloseDialog = useCallback(() => {
        setShow(!show)
    }, [show])

    return (
        <>
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
        </>
    )
}

export default memo(Calendar)
