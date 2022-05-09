import {Button, Modal} from "react-bootstrap"
import React from "react"


export const AlertDialog = ({children, show, closeHandler, title, status}) => (
	<Modal className="alert-container" show={show} onHide={closeHandler} size="md" centered>
		<Modal.Header closeButton>
			<Modal.Title>{title}</Modal.Title>
		</Modal.Header>

		<Modal.Body className="flex-column center">
			{children}
		</Modal.Body>

		<Modal.Footer>
			{Number(status) > 0
					? <span className="status-message error centered">{`Код ошибки: ${status}`}</span>
					: <span className="status-message centered">{status}</span>
			}
		</Modal.Footer>
	</Modal>
)


export const ModalDialog = ({children, show, submitHandler, closeHandler, title, footer}) => (
	<Modal show={show} onHide={closeHandler} size="xl" fullscreen="sm-down" scrollable={true} centered>
		<Modal.Header closeButton>
			<Modal.Title>{title}</Modal.Title>
		</Modal.Header>

		<Modal.Body className="flex-column center">
			{children}
		</Modal.Body>

		<Modal.Footer className="centered gap">
			{footer}
		</Modal.Footer>
	</Modal>
)

