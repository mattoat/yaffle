import React from "react";
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled'
import { textAlign } from "@mui/system";

const Frame = styled.div`
    margin-top:-20px;
    margin-left: 5%;
    margin-right: 5%;

`
const paperStyle = {
    padding: '6%',
    backgroundColor: '#F9FBFF',
    textAlign:'center',
    marginBottom:'5%', 
    display: 'flow-root'
  };

export default function Page(props) {
  return (
    <Frame>
        <Paper elevation={15} style={paperStyle}>
            {props.children}
        </Paper>
    </Frame>
  );


}