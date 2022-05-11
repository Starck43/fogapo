import {Form, InputGroup, FloatingLabel} from "react-bootstrap"


const Control = ({title, type='text', choices, required = false, inline = false, placeholder='', autocomplete, name, objIndex = ''}) => {

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
		<Form.Group className="form-group my-4vh" controlId={`${name}${objIndex}`}>
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
				) : (type === 'text' || type === 'number' || type === 'tel' || type === 'email' ? (choices ? (
							<>
								<Form.Label>{title}</Form.Label>
								{choices?.map((obj, i) => (
									<FloatingLabel
										className={`mb-2 max-content ${inline ? "inline" : ""}`}
										key={`${name}${objIndex}-${i}`}
										controlId={`${name}${objIndex}-${i}`}
										label={obj}
									>
										<Form.Control
											type={type}
											name={`${name}${objIndex}-${i}`}
											placeholder={placeholder ? placeholder : obj}
											autoComplete={autocomplete}
											required={required}
										/>
									</FloatingLabel>
								))}
							</>
						) : (
							<FloatingLabel controlId={`${name}${objIndex}`} label={title}>
								<Form.Control
									type={type}
									name={`${name}${objIndex}`}
									placeholder={placeholder ? placeholder : title}
									autoComplete={autocomplete}
									required={required}
								/>
							</FloatingLabel>
						)
					) : (type === 'select' ? (
							<FloatingLabel controlId={`${name}${objIndex}`} label={title}>
								<Form.Control
									as="select"
									name={`${name}${objIndex}`}
									placeholder={placeholder ? placeholder : title}
									required={required}
									defaultValue=""
								>
									<option value="" disabled>{`не указано`}</option>
									{choices?.map((option, i) => (
										<option value={option} key={`${name}${objIndex}-${i}`}>{option}</option>
									))}
								</Form.Control>
							</FloatingLabel>
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


