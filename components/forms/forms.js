import {Fragment} from "react"
import {Form, Button} from "react-bootstrap"
import Control from "../UI/controls"
import SubTitle from "../UI/subtitle"

import style from "/styles/form.module.sass"

export const RegistrationForm = ({id, data, submitHandler, closeHandler, validated}) => {
	return (
		<Form className={`flex-column my-2vh ${style.form}`} onSubmit={submitHandler} validated={validated}>
			<input type="hidden" name="id" value={id}/>
			{Object.keys(data).map((key) => (
				<Fragment key={key}>
					{typeof data[key] === 'string' &&
						<SubTitle className="question-title">{data[key]}</SubTitle>
					}
					{data[key] instanceof Object && !(data[key] instanceof Array) &&
						<Control {...data[key]} name={key}/>
					}
					{data[key] instanceof Array &&
						data[key].map((obj, index) => <Control {...obj} name={key+index} key={index}/>)
					}
				</Fragment>
			))}
			<div className={`controls-block centered pt-3 gap ${style.controls}`}>
				<Button variant="primary" type="submit">Отправить</Button>
				<Button variant="secondary" type="button" onClick={closeHandler}>Отменить</Button>
			</div>
		</Form>
	)
}
