import {Form, InputGroup, FloatingLabel} from "react-bootstrap"


const Control = ({title, type, choices, required = false, inline = false, name, objIndex = ''}) => {

	const handleClick = (e) => {
		let parent = e.target.parentNode
		let siblingInput = parent.querySelector(`input:not([type=${e.target.type}])`) // найдем соседний input

		if (e.target.type === 'radio' || e.target.type === 'checkbox') {
			siblingInput && siblingInput.focus()
		} else {
			if (siblingInput) {
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
							placeholder
							required={required}
							style={{ height: '100px' }}
						/>
					</>
				) : (type === 'input' || !type ? (choices ? (
							<>
								<Form.Label>{title}</Form.Label>
								{choices?.map((obj, i) => (
									<InputGroup className="mb-2">
										<InputGroup.Text>{obj}</InputGroup.Text>
										<Form.Control
											type={type}
											name={`${name}${objIndex}-${i}`}
											placeholder
											required={required}
										/>
									</InputGroup>
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
								<Form.Select
									name={`${name}${objIndex}`}
									placeholder={title}
									required={required}
								>
									<option value="" selected="selected" disabled="disabled">{`не указано`}</option>
									{choices?.map((option, i) => (
										<option value={`${name}${objIndex}-${i + 1}`}
										        key={`${name}${objIndex}-${i}`}>{option}</option>
									))}
								</Form.Select>
							</FloatingLabel>
						) : (type === 'radio' || type === 'checkbox' ? (
								<div className="mb-3">
									<Form.Label>{title}</Form.Label>
									{choices?.map((obj, i) => (
										<Form.Check
											key={`${type}${objIndex}-${i}`}
											id={`${name}${objIndex}-${i}`}
											group={`${name}_${objIndex}_group`}
											type={type}
											inline={inline}
										>
											{obj instanceof Object ? (
												<>
													<Form.Check.Input type={type} name={`${name}${objIndex}`}
													                  required={required} value={Object.values(obj)}
													                  onClick={handleClick}/>
													<Form.Check.Label>{Object.values(obj)}</Form.Check.Label>
													<Form.Control type={Object.keys(obj)} onClick={handleClick}
													              onBlur={handleClick}/>
												</>
											) : (
												<>
													<Form.Check.Input type={type} name={`${name}${objIndex}`}
													                  value={obj} onClick={handleClick}/>
													<Form.Check.Label>{obj}</Form.Check.Label>
												</>
											)}
										</Form.Check>
									))}
									{/*<Form.Control type="hidden" name={`${name}${objIndex}`}/>*/}
								</div>
							) : null
						)
					)
				)
			}
		</Form.Group>
	)
}

export default Control


