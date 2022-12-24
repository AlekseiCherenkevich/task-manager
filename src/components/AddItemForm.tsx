import React, {ChangeEvent, useState} from "react";

type AddItemFormType = {
    onClick: (value: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = (props) => {
    const [value, setValue] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onCLickHandler = () => {
        props.onClick(value)
        setValue('')
    }

    return <div>
        <input value={value} onChange={onChangeHandler} type="text"/>
        <button onClick={onCLickHandler}>+</button>
    </div>
}