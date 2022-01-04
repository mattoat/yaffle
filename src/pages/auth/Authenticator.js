import React from 'react'
import {Tabs, Tab} from '@mui/material'
import Page from '../../components/Page'
import Login from './Login'
import Register from './Register'
import {styles} from '../../styles/styles'

const brandSrc = "/assets/TextOnlyYaffle.svg";


class Authenticator extends React.Component {
        
  state = {
    showSignIn: true,
    value: 1
  }
  
  render() {


    const handleChange = (event, val) => {
        let obj = {showSignIn: val, value: val}
        this.setState(obj)
    };

    const { showSignIn } = this.state
    return (
      <Page>
            <img style={styles.imgStyle} src={brandSrc} alt='Yaffle' />
        {
          showSignIn ? (
            <Login />
          ) : (
            <Register/>
          )
        }
        <Tabs 
        value={this.state.value}
        textColor="secondary"
        indicatorColor="secondary"
        onChange={handleChange}
        centered>
            <Tab value={1} label="Log In" />
            <Tab value={0} label="Sign Up" />
        </Tabs>
      </Page>
    )
  }
}

export default (Authenticator)
