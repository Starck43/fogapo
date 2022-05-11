import {Form, InputGroup, FloatingLabel} from "react-bootstrap"

import InputControl from "./controls/text"
import SelectControl from "./controls/select"


const Control = ({
		title,
		type='text',
		choices,
		selected="",
		required = false,
		inline = false,
		compact="true",
		placeholder='',
		autocomplete,
		name,
		objIndex = ''
	}) => {

	const handleClick = (e) => {
		let parent = e.target.parentNode
		let siblingInput = parent.querySelector(`#${e.target.id}:not([type=${e.target.type}])`) // найдем соседний input
		if (siblingInput) {

			if (e.target.type === 'radio' || e.target.type === 'checkbox') {
				if (e.target.checked) {
					siblingInput.focus()
					e.target.value = siblingInput.value
				} else
				{
					e.target.value = ''
				}
			} else
			{
				siblingInput.checked = true
				siblingInput.value = e.target.value
			}

		}
	}

	return (
		<Form.Group className="form-group mb-3" controlId={`${name}${objIndex}`}>
			{
				type === 'textarea' ? (
					<>
						<Form.Label>{title}</Form.Label>
						<Form.Control
							as={type}
							name={`${name}${objIndex}`}
							required={required}
							placeholder={placeholder}
							autoComplete={autocomplete}
							rows={3}
						/>
					</>
				) : (type === 'text' || type === 'number' || type === 'tel' || type === 'email' ? (
						<InputControl
							type={type}
							choices={choices}
						 	title={title}
							name={`${name}${objIndex}`}
							placeholder={placeholder}
							autoComplete={autocomplete}
							required={required}
						/>
					) : (type === 'select' ? (
							<SelectControl
								name={`${name}${objIndex}`}
								title={title}
								choices={choices}
								selected={selected}
								placeholder={placeholder}
								required={required}
								compact={compact}
							/>
						) : (type === 'radio' || type === 'checkbox' ? (
								<>
									<Form.Label>{title}</Form.Label>
									{choices?.map((obj, i) => (
										<Form.Check
											key={`${type}${objIndex}-${i}`}
											id={`${name}${objIndex}-${i}`}
											group={`${name}_${objIndex}_group`}
											inline={inline}
											value={obj}
											label={obj}
											type={type}
											name={type === 'radio' ?  `${name}${objIndex}` : `${name}${objIndex}-${i}`}
											required={type === 'radio' ? required : false}
											className="form-check mb-1"
										>
											{obj instanceof Object ? (
												<>
													<Form.Check.Input type={type} name={type === 'radio' ?  `${name}${objIndex}` : `${name}${objIndex}-${i}`} onClick={handleClick}/>
													<Form.Check.Label>{Object.values(obj)}</Form.Check.Label>
													{type === 'textarea'
														? <Form.Control as={Object.keys(obj)} rows={3} onClick={handleClick} onBlur={handleClick}/>
														: <Form.Control type={Object.keys(obj)} onClick={handleClick} onBlur={handleClick}/>
													}
												</>
											) : null}
										</Form.Check>
									))}
									{/*<Form.Control type="hidden" name={`${name}${objIndex}`}/>*/}
								</>
							) : null
						)
					)
				)
			}
		</Form.Group>
	)
}

export default Control


