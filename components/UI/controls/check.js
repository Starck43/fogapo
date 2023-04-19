import { Form } from "react-bootstrap"

const CheckControl = ({ type, choices, title, name, required, inline, className }) => {
    const handleClick = (e) => {
        let parent = e.target.parentNode
        let siblingInput = parent.querySelector(`#${e.target.id}:not([type=${e.target.type}])`) // найдем соседний input
        if (siblingInput) {
            if (e.target.type === "radio" || e.target.type === "checkbox") {
                if (e.target.checked) {
                    siblingInput.focus()
                    e.target.value = siblingInput.value
                } else {
                    e.target.value = ""
                }
            } else {
                siblingInput.checked = true
                siblingInput.value = e.target.value
            }
        }
    }

    return (
        <>
            <Form.Label>{title}</Form.Label>
            {choices?.map((value, i) => (
                <Form.Check
                    key={`${type}-${i}`}
                    id={`${name}-${i}`}
                    group={`${name}_group`}
                    name={type === "radio" ? `${name}` : `${name}-${i}`}
                    value={value}
                    label={value}
                    type={type}
                    inline={inline}
                    required={type === "radio" ? required : false}
                    className={`form-check mb-1`}
                >
                    {value instanceof Object ? (
                        <>
                            <Form.Check.Input
                                type={type}
                                name={type === "radio" ? `${name}` : `${name}-${i}`}
                                onClick={handleClick}
                            />
                            <Form.Check.Label>{Object.values(value)}</Form.Check.Label>
                            {type === "textarea" ? (
                                <Form.Control
                                    as={Object.keys(value)}
                                    rows={3}
                                    onClick={handleClick}
                                    onBlur={handleClick}
                                />
                            ) : (
                                <Form.Control
                                    type={Object.keys(value)}
                                    onClick={handleClick}
                                    onBlur={handleClick}
                                />
                            )}
                        </>
                    ) : null}
                </Form.Check>
            ))}
        </>
    )
}

export default CheckControl
