import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputPropsType = {
    onKeyPress: () => void
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
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (value.trim().length) {
                props.onKeyPress()
                setValue('')
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
        <input value={value}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               onBlur={onBlurHandler}
               type="text"/>
        {error && <div>{error}</div>}
    </div>
};

export default Input