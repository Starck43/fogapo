import {Form, FloatingLabel} from "react-bootstrap"


const SelectControl = ({choices, selected="", title, name, placeholder, required, compact}) => (
	!compact
	?   <FloatingLabel controlId={name} label={title}>
			<Form.Select
				name={name}
				placeholder={placeholder ? placeholder : title}
				required={required}
				defaultValue={selected}
			>
				{!selected && <option value={selected} disabled>{`не указано`}</option>}
				{choices?.map((value, i) => <option value={value} key={`${name}-${i}`}>{value}</option>)}
			</Form.Select>
		</FloatingLabel>
	: <>
		<Form.Label>{title}</Form.Label>
		<Form.Select
			name={name}
			placeholder={title}
			required={required}
			defaultValue={selected}
		>
			{!selected && <option value={selected} disabled>{`не указано`}</option>}
			{choices?.map((value, i) => <option value={value} key={`${name}-${i}`}>{value}</option>)}
		</Form.Select>
	</>
)

export default SelectControl
