import {Button, Modal} from "react-bootstrap"
import React from "react"


export const AlertDialog = ({children, show, closeHandler, title, footer, className}) => (
	<Modal className={`alert-container ${className}`} show={show} onHide={closeHandler} size="md" centered>
		<Modal.Header closeButton>
			<Modal.Title>{title}</Modal.Title>
		</Modal.Header>

		<Modal.Body className="flex-column center">
			{children}
		</Modal.Body>

		{footer}
	</Modal>
)


export const ModalDialog = ({children, show, submitHandler, closeHandler, title, footer, className}) => (
	<Modal className={`${className}`} show={show} onHide={closeHandler} size="xl" fullscreen="sm-down" scrollable={true} centered>
		<Modal.Header closeButton>
			<Modal.Title>{title}</Modal.Title>
		</Modal.Header>

		<Modal.Body className="flex-column center">
			{children}
		</Modal.Body>

		{footer}
	</Modal>
)

