import React, { Component } from 'react';
import {
  Button, Form, Grid, Header, Image, Message, Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event, props) {
    const { userName } = this.state;
    this.event.preventDefault();
    this.props.isLoggedIn = true;
    this.props.userName = userName;
  }

  render() {
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value="123456789"
              />

              <Button color="teal" fluid size="large" type="submit">
                                Login
              </Button>
            </Segment>
          </Form>
          <Message>
                        New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
