import { Form, FloatingLabel } from "react-bootstrap"

const SelectControl = (props) => {
    const { choices, selected = "", title, name, placeholder, required, compact, className } = props

    const content = (
        <Form.Select
            name={name}
            placeholder={placeholder ? placeholder : title}
            required={required}
            defaultValue={selected}
            className={className}
        >
            {!selected && <option value={selected} disabled>{`не указано`}</option>}
            {choices?.map((value, i) => (
                <option value={value} key={`${name}-${i}`}>
                    {value}
                </option>
            ))}
        </Form.Select>
    )

    return compact ? (
        <FloatingLabel controlId={name} label={title}>
            {content}
        </FloatingLabel>
    ) : (
        <>
            <Form.Label>{title}</Form.Label>
            {content}
        </>
    )
}

export default SelectControl
