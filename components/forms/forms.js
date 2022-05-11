import {Form} from "react-bootstrap"
import {Fragment, useState} from "react"
import Control from "../UI/controls"
import SubTitle from "../UI/subtitle"


export const RegistrationForm = ({data, validated}) => {
	return (
		<Form className="my-2vh" validated={validated}>
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
		</Form>
	)
}
