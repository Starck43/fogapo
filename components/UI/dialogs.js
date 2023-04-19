import { Modal } from "react-bootstrap"

export const AlertDialog = (props) => {
    const {
        children,
        show,
        closeHandler,
        title,
        footer,
        className = "",
        size = "md",
        ...other
    } = props
    return (
        <Modal
            className={`alert-container ${className}`}
            show={show}
            onHide={closeHandler}
            size={size}
            centered
            {...other}
            aria-labelledby="alertDialogId"
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="flex-column">{children}</Modal.Body>

            {footer}
        </Modal>
    )
}

export const ModalDialog = (props) => {
    const { children, show, closeHandler, title, footer, className = "", size = "xl" } = props
    return (
        <Modal
            className={`${className}`}
            show={show}
            onHide={closeHandler}
            size={size}
            fullscreen="sm-down"
            scrollable={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="flex-column center">{children}</Modal.Body>

            {footer}
        </Modal>
    )
}
