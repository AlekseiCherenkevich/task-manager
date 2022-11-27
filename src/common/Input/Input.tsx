import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';

type InputPropsType = {
    placeholder?: string
    callback: (value: string) => void
}

export const Input: React.FC<InputPropsType> = (props) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.charCode === 13 && onClickHandler()
    const onClickHandler = () => {
        if (value?.trim().length) {
            props.callback(value)
            setError('')
            setValue('')
        } else {
            setError('Field is required!')
        }
    }
    const onBlurHandler = () => setError('')

    return <>
        <TextField
            id="outlined-basic"
            label="Enter title"
            variant="outlined"
            size="small"
            value={value}
            autoFocus={true}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            placeholder={props.placeholder}
            onBlur={onBlurHandler}
            error={!!error}
            helperText={error}
        />
        <Button
            onClick={onClickHandler}
            size="medium"
            variant="contained"
            color="primary"
            style={{maxWidth: '36px', minWidth: '39px', maxHeight: '36px', minHeight: '39px', fontSize: '30px'}}
        >+</Button>
    </>
}