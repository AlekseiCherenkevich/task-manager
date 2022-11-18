import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type InputPropsType = {
    placeholder?: string
    callback: (value: string) => void
}

export const Input: React.FC<InputPropsType> = (props) => {
    const [value, setValue] = useState<string>()
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.charCode === 13 && onClickHandler()
    const onClickHandler = () => {
        if (value?.trim().length) {
            props.callback(value)
            setError('')
        } else {
            setError('Field is required!')
        }
    }
    const onBlurHandler = () => setError('')

    return <>
        <input
            value={value}
            type="text"
            autoFocus={true}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            placeholder={props.placeholder}
            onBlur={onBlurHandler}

        />
        <button onClick={onClickHandler}>+</button>
        {error && <div>{error}</div>}
    </>
}