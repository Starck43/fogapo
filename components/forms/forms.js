import {Fragment, useState} from "react"

import {Form, Button} from "react-bootstrap"
import Control from "../UI/controls"
import SubTitle from "../UI/subtitle"

export const RegistrationForm = ({data, submitHandler, closeHandler, validated}) => {
	return (
		<Form className="my-2vh" onSubmit={submitHandler} validated={validated}>
			{Object.keys(data).map((key) => (
				<Fragment key={key}>
					{typeof data[key] === 'string' &&
						<SubTitle className="question-title">{data[key]}</SubTitle>
					}
					{data[key] instanceof Object && !(data[key] instanceof Array) &&
						<Control {...data[key]} name={key}/>
					}
					{data[key] instanceof Array &&
						data[key].map((obj, index) => <Control {...obj} name={key} objIndex={index} key={index}/>)
					}
				</Fragment>
			))}
			<div className="centered pt-3 gap">
				<Button variant="primary" type="submit">Отправить</Button>
				<Button variant="secondary" type="button" onClick={closeHandler}>Отменить</Button>
			</div>
		</Form>
	)
}
