import {SortValuesType} from "../../../store/todolists-reducer";
import React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {showActiveButton} from "../../../utils/helpers";
import styled from "styled-components";

type SortingButtonsPropsType = {
    sort: SortValuesType
    changeSort: (sort: SortValuesType) => () => void
}

export const SortingButtons: React.FC<SortingButtonsPropsType> = ({sort, changeSort}) => {
    return <SortingButtonsStyle>
        <ButtonGroup size={"small"}>
            <Button
                variant={showActiveButton(sort, "default")}
                onClick={changeSort("default")}
            >Default</Button>
            <Button
                variant={showActiveButton(sort, "A-z")}
                onClick={changeSort("A-z")}
            >A-z</Button>
            <Button
                variant={showActiveButton(sort, "z-A")}
                onClick={changeSort("z-A")}
            >Z-a</Button>
        </ButtonGroup>
    </SortingButtonsStyle>
}

const SortingButtonsStyle = styled.div`
  
`