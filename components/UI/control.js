import {Form} from "react-bootstrap"


const Control = ({title, type, choices, inline, name, objIndex=''}) => {

	const handleClick = (e) => {
		let parent = e.target.parentNode
		let siblingInput = parent.querySelector(`input:not([type=${e.target.type}])`) // найдем соседний input

		if (e.target.type === 'radio'|| e.target.type === 'checkbox') {
			siblingInput && siblingInput.focus()
		} else {
			if (siblingInput) {
				siblingInput.checked = true
				siblingInput.value = e.target.value
			}
		}
	}

	return (
		<Form.Group className="my-2" controlId={`${name}${objIndex}`}>
			<Form.Label>{title}</Form.Label>
			{
				type === 'input' || !type ? (
					<Form.Control type={type} name={`${name}${objIndex}`} placeholder="" required/>
				) : (
					type === 'select' ? (
						<Form.Control as="select" type="select" name={`${name}${objIndex}`} required>
							<option value="" selected="selected" disabled="disabled">{`не указано`}</option>
							{choices.map((option, i) => (
								<option value={`${name}${objIndex}-${i+1}`} key={`${name}${objIndex}-${i}`}>{option}</option>
							))}
						</Form.Control>
					) : (
						type === 'radio' || type === 'checkbox' ? (
							<>
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
												<Form.Check.Input type={type} name={`${name}${objIndex}`} required value={Object.values(obj)} onClick={handleClick}/>
												<Form.Check.Label>{Object.values(obj)}</Form.Check.Label>
												<Form.Control type={Object.keys(obj)} onClick={handleClick} onBlur={handleClick}/>
											</>
										) : (
											<>
												<Form.Check.Input type={type} name={`${name}${objIndex}`} value={obj} onClick={handleClick}/>
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
			}
		</Form.Group>
	)
}

export default Control


