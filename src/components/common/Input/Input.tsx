import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputPropsType = {
    callback: (value: string) => void
}

const Input: React.FC<InputPropsType> = (props) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }
        setValue(e.currentTarget.value)
    }
    const callBackHandler = () => {

        if (value.trim().length) {
            props.callback(value)
            setValue('')
            setError('')
        } else {
            setError('Field is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callBackHandler()
        }
    }

    const onBlurHandler = () => {
        if (error) {
            setError('')
        }
    }

    return <div>
        <div>
            <input value={value}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   onBlur={onBlurHandler}
                   type="text"/>
            {error && <div>{error}</div>}
        </div>
        <button onClick={callBackHandler}>+</button>
    </div>
};

export default Input