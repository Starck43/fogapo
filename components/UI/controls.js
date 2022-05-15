import {Form, InputGroup, FloatingLabel} from "react-bootstrap"

import InputControl from "./controls/text"
import SelectControl from "./controls/select"
import CheckControl from "./controls/check"


const Control = ({
		title,
		type='text',
		choices,
		selected='',
		required=false,
		inline=false,
		compact=true,
		placeholder='',
		autocomplete,
		name,
	}) => {

	return (
		<Form.Group className="form-group mb-3" controlId={name}>
			{
				type === 'textarea' ? (
					<>
						<Form.Label>{title}</Form.Label>
						<Form.Control
							as={type}
							name={name}
							rows={3}
							placeholder={placeholder}
							autoComplete={autocomplete}
							required={required}
						/>
					</>
				) : (type === 'text' || type === 'number' || type === 'tel' || type === 'email' ? (
						<InputControl
							type={type}
							choices={choices}
						 	title={title}
							name={name}
							placeholder={placeholder}
							autocomplete={autocomplete}
							inline={inline}
							required={required}
							compact={compact}
						/>
					) : (type === 'select' ? (
							<SelectControl
								name={name}
								title={title}
								choices={choices}
								selected={selected}
								placeholder={placeholder}
								required={required}
								compact={compact}
							/>
						) : (type === 'radio' || type === 'checkbox' ? (
								<CheckControl
									type={type}
									choices={choices}
								 	title={title}
									name={name}
									inline={inline}
									required={required}
								/>
							) : null
						)
					)
				)
			}
		</Form.Group>
	)
}

export default Control


