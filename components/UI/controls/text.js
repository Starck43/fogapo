import { Form, FloatingLabel } from "react-bootstrap"

const InputControl = (props) => {
    const {
        type = "text",
        title,
        choices = null,
        name,
        placeholder,
        autocomplete,
        required,
        inline,
        compact,
        className,
    } = props

    return choices ? (
        <>
            <Form.Label>{title}</Form.Label>
            {choices?.map((value, i) => (
                <FloatingLabel
                    key={`${name}-${i}`}
                    controlId={`${name}-${i}`}
                    label={value}
                    className={`mb-2 max-content ${inline ? "inline" : ""}`}
                >
                    <FormControl
                        type={type}
                        name={`${name}-${i}`}
                        placeholder={placeholder ? placeholder : value}
                        autoComplete={autocomplete}
                        required={required}
                        className={className}
                    />
                </FloatingLabel>
            ))}
        </>
    ) : compact ? (
        <FloatingLabel controlId={name} label={title}>
            <FormControl
                type={type}
                name={name}
                placeholder={placeholder ? placeholder : title}
                autocomplete={autocomplete}
                required={required}
                className={className}
            />
        </FloatingLabel>
    ) : (
        <>
            <Form.Label>{title}</Form.Label>
            <FormControl
                type={type}
                name={name}
                placeholder={placeholder}
                autocomplete={autocomplete}
                required={required}
                className={className}
            />
        </>
    )
}

export default InputControl

const FormControl = ({ className, ...others }) => <Form.Control {...others} className={className} />
