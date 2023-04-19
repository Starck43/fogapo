import { Fragment, memo } from "react"
import { Button, Form } from "react-bootstrap"

import Control from "../UI/controls"
import Title from "../UI/title"

import style from "./registration-form.module.sass"

const RegistrationForm = ({ id, data, submitHandler, closeHandler, validated }) => {
    return (
        <Form
            className={`flex-column my-2vh ${style.form}`}
            onSubmit={submitHandler}
            validated={validated}
        >
            <input type="hidden" name="id" value={id} />
            {Object.keys(data).map((key) => (
                <Fragment key={key}>
                    {typeof data[key] === "string" && (
                        <Title as="h4" className="question-title" title={data[key]} />
                    )}
                    {data[key] instanceof Object && !(data[key] instanceof Array) && (
                        <Control {...data[key]} name={key} className={style.float__control} />
                    )}
                    {data[key] instanceof Array &&
                        data[key].map((obj, index) => (
                            <Control
                                {...obj}
                                name={key + index}
                                key={index}
                                className={style.float__control}
                            />
                        ))}
                </Fragment>
            ))}
            <div className={`controls-block centered py-2vh gap ${style.controls}`}>
                <Button variant="primary" type="submit">
                    Отправить
                </Button>
                <Button variant="secondary" type="button" onClick={closeHandler}>
                    Отменить
                </Button>
            </div>
        </Form>
    )
}

export default memo(RegistrationForm)
