import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

export default props  => {
  return (
    <Container style={{paddingTop: "10px"}}>
      <Header />
      {props.children}
      <h1>I'm a footer</h1>
    </Container>
  )
}