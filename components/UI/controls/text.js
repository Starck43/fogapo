import {Form, FloatingLabel} from "react-bootstrap"


const InputControl = ({type="text", title, choices=null, name, placeholder, autocomplete, required, inline=false, compact="true"}) => (
	choices ?
	<>
		<Form.Label>{title}</Form.Label>
		{choices?.map((value, i) => (
			<FloatingLabel
				className={`mb-2 max-content ${inline ? "inline" : ""}`}
				key={`${name}-${i}`}
				controlId={`${name}-${i}`}
				label={value}
			>
				<FormControl
					type={type}
					name={`${name}-${i}`}
					placeholder={placeholder ? placeholder : value}
					autoComplete={autocomplete}
					required={required}
				/>
			</FloatingLabel>
		))}
	</>
	: compact
		?   <FloatingLabel controlId={name} label={title}>
				<FormControl
					type={type}
					name={name}
					placeholder={placeholder ? placeholder : title}
					autoComplete={autocomplete}
					required={required}
				/>
			</FloatingLabel>
		: <>
			<Form.Label>{title}</Form.Label>
			<FormControl
				type={type}
				name={name}
				placeholder={placeholder}
				autoComplete={autocomplete}
				required={required}
			/>
		</>
)

export default InputControl

const FormControl = ({type, name, placeholder, autocomplete, required}) => (
	<Form.Control
		type={type}
		name={name}
		placeholder={placeholder}
		autoComplete={autocomplete}
		required={required}
	/>
)
