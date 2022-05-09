import {Form} from "react-bootstrap"
import {Fragment, useState} from "react"
import Control from "../UI/control"
import SubTitle from "../UI/subtitle"


export default function RegistrationForm({data, validated}) {

	return (
		<Form className="my-2" validated={validated}>
			{Object.keys(data).map((key) => (
				<Fragment key={key}>
					{typeof data[key] === 'string' && <SubTitle className="question-title">{data[key]}</SubTitle>}
					{data[key] instanceof Object && !(data[key] instanceof Array) &&
					<Control {...data[key]} name={key}/>}
					{data[key] instanceof Array && data[key].map((obj, index) => <Control {...obj} name={key}
					                                                                      objIndex={index} key={index}/>
					)}
				</Fragment>
			))}
		</Form>
	)
}
