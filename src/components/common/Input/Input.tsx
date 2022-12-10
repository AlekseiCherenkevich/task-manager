import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TextField from '@mui/material/TextField';


type InputPropsType = {
    placeholder?: string
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

    return <InputStyle>
        <div>
            <TextField
                error={!!error}
                helperText={error}
                label={props.placeholder}
                variant="standard"
                value={value}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={onBlurHandler}
                type="text"/>
            {/*{error && <div>{error}</div>}*/}
        </div>
        <Button
            variant={"contained"}
            onClick={callBackHandler}
        >+</Button>
    </InputStyle>
};

const InputStyle = styled.div`
  display: flex;
  height: 73px;

  .MuiInputBase-root, .MuiInput-root, .MuiInput-underline, .MuiInputBase-colorPrimary, .MuiInputBase-formControl, .css-1ptx2yq-MuiInputBase-root-MuiInput-root {
    margin-right: 10px;
  }

  .MuiButtonBase-root, .MuiButton-root, .MuiButton-contained, .MuiButton-containedPrimary, .MuiButton-sizeMedium, .MuiButton-containedSizeMedium, .MuiButton-root, .MuiButton-contained, .MuiButton-containedPrimary, .MuiButton-sizeMedium, .MuiButton-containedSizeMedium, .css-sghohy-MuiButtonBase-root-MuiButton-root {
    max-width: 30px;
    min-width: 30px;
    max-height: 30px;
    min-height: 30px;
    position: relative;
    right: 0;
    top: 17px;
  }
  .MuiFormHelperText-root, .Mui-error, .MuiFormHelperText-sizeMedium, .css-1d1r5q-MuiFormHelperText-root {
  }
`

export default Input