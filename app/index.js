import React from 'react'
import { View } from 'react-native'
import styled, { ThemeProvider  } from 'styled-components'

// redux
import { Provider } from 'react-redux'
import configureStore from './config/store'

// routes
import Routes from './config/routes'

// axios - api
import setupAxios from './config/axios'

// css theme
import { mainTheme } from './utils/themes'

// set basename for api urls
setupAxios()

const Container = styled.View`
  flex: 1;
  align-items: stretch;
  top: 24;
`

export const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={mainTheme}>
          <Container>
            <Routes />
          </Container>
        </ThemeProvider>
      </Provider>
    );
  }
}
