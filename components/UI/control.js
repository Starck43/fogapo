import {Form, InputGroup, FloatingLabel} from "react-bootstrap"


const Control = ({title, type, choices, required = false, inline = false, name, objIndex = ''}) => {

	const handleClick = (e) => {
		let parent = e.target.parentNode
		let siblingInput = parent.querySelector(`#${e.target.id}:not([type=${e.target.type}])`) // найдем соседний input

		if (siblingInput) {
			if (e.target.type === 'radio' || e.target.type === 'checkbox') {
				siblingInput.focus()
			} else {
				siblingInput.checked = true
				siblingInput.value = e.target.value
			}
		}
	}

	return (
		<Form.Group className="form-group my-4" controlId={`${name}${objIndex}`}>
			{
				type === 'textarea' ? (
					<>
						<Form.Label>{title}</Form.Label>
						<Form.Control
							as={type}
							name={`${name}${objIndex}`}
							required={required}
							style={{ height: '100px' }}
						/>
					</>
				) : (type === 'input' || !type ? (choices ? (
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
											placeholder={obj}
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
									placeholder={title}
									required={required}
								/>
							</FloatingLabel>
						)
					) : (type === 'select' ? (
							<FloatingLabel controlId={`${name}${objIndex}`} label={title}>
								<Form.Control
									as="select"
									name={`${name}${objIndex}`}
									placeholder={title}
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
											className="form-check mb-1"
										>
											{obj instanceof Object ? (
												<>
													<Form.Check.Input
														type={type}
														name={`${name}${objIndex}`}
														required={required}
														value={Object.values(obj)}
														onClick={handleClick}
													/>
													<Form.Check.Label>{Object.values(obj)}</Form.Check.Label>
													<Form.Control type={Object.keys(obj)} onClick={handleClick} onBlur={handleClick}/>
												</>
											) : (
												<>
													{type === 'textarea'
														? <Form.Check.Input as={type} name={`${name}${objIndex}`} required={required} value={obj}/>
														: <Form.Check.Input type={type} name={`${name}${objIndex}`} required={required} value={obj}/>
													}
													<Form.Check.Label>{obj}</Form.Check.Label>
												</>
											)}
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


