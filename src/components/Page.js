import React from "react";
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled'

const Frame = styled.div`
    margin-top:-30px;
    margin-left: 5%;
    margin-right: 5%;

`

export default function Page(props) {
  return (
    <Frame>
        <Paper style={{padding:'6%'}}>
            {props.children}
        </Paper>
    </Frame>
  );


}