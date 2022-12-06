import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputPropsType = {
    value: string
    onKeyPress: (value: string) => void
    onChange: (value: string) => void
}

const Input: React.FC<InputPropsType> = (props) => {
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }
        props.onChange(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (props.value.trim().length) {
                props.onKeyPress(e.currentTarget.value)
                props.onChange('')
                setError('')
            } else {
                setError('Field is required')
            }
        }
    }
    const onBlurHandler = () => {
        if (error) {
            setError('')
        }
    }

    return <div>
        <input value={props.value}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               onBlur={onBlurHandler}
               type="text"/>
        {error && <div>{error}</div>}
    </div>
};

export default Input