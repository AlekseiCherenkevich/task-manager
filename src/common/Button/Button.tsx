import React from 'react';

type ButtonPropsType = {
    children: string
    onClick: () => void
}

export const Button: React.FC<ButtonPropsType> = (props) => {
    const onClickHandler = () => props.onClick()
    return (
        <button onClick={onClickHandler}>{props.children}</button>
    );
};