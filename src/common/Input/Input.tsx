import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
        <IconButton onClick={onClickHandler}>
            <AddCircleOutlineIcon fontSize="inherit" color="primary"/>
        </IconButton>
    </>
}