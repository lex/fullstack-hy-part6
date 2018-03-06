import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const styles = {
  menuLinkStyle: {
    color: 'black',
  },
};

const Menu = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>Software anecdotes</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer exact to="/">
        <NavItem eventKey={1}>anecdotes</NavItem>
      </LinkContainer>
      <LinkContainer to="/create">
        <NavItem eventKey={2}>create</NavItem>
      </LinkContainer>
      <LinkContainer to="/about">
        <NavItem eventKey={3}>about</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

const notificationStyle = {
  borderRadius: '5px',
  border: '2px solid #73AD21',
  padding: '2px',
  margin: '5px',
};

const notificationTextStyle = {
  color: '#73AD21',
};

const Notification = ({ text }) => (
  <div style={notificationStyle}>
    <p style={notificationTextStyle}>{text}</p>
  </div>
);

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => (
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

const About = () => (
  <Grid>
    <h2>About anecdote app</h2>
    <Row className="show-grid">
      <Col xs={12} md={8}>
        <p>According to Wikipedia:</p>

        <em>
          An anecdote is a brief, revealing account of an individual person or
          an incident. Occasionally humorous, anecdotes differ from jokes
          because their primary purpose is not simply to provoke laughter but to
          reveal a truth more general than the brief tale itself, such as to
          characterize a person by delineating a specific quirk or trait, to
          communicate an abstract idea about a person, place, or thing through
          the concrete details of a short narrative. An anecdote is "a story
          with a point."
        </em>

        <p>
          Software engineering is full of excellent anecdotes, at this app you
          can find the best and add more.
        </p>
      </Col>
      <Col xs={6} md={4}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/dd/AlfredAhoPortrait.jpg"
          alt="aho"
        />
      </Col>
    </Row>
  </Grid>
);

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>. See{' '}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </div>
);

class CreateNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      author: '',
      info: '',
    };
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0,
    });
    this.props.history.push('/');
    this.props.showNotification(
      `a new anecdote ${this.state.content} created!`,
      10,
    );
  };

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="anecdoteContent">
            <Col componentClass={ControlLabel} sm={2}>
              Content
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="An exercise is not designed to have you create a full story."
                name="content"
                value={this.state.content}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="anecdoteAuthor">
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Pertti Ojanen"
                name="author"
                value={this.state.author}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="anecdoteInfo">
            <Col componentClass={ControlLabel} sm={2}>
              URL for more info
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="http://www.wikipedia.org"
                name="info"
                value={this.state.info}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Create</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info:
            'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1',
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2',
        },
      ],
      notification: '',
    };
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) });
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  showNotification = (text, delay) => {
    this.setState({ notification: text });
    setTimeout(() => {
      this.setState({ notification: '' });
    }, delay * 1000);
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Menu />

          {this.state.notification && (
            <Notification text={this.state.notification} />
          )}

          <Route
            exact
            path="/"
            render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
          />

          <Route
            exact
            path="/anecdotes/:id"
            render={({ match }) => (
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />
            )}
          />

          <Route path="/about" render={() => <About />} />

          <Route
            path="/create"
            render={({ history }) => (
              <CreateNew
                history={history}
                showNotification={this.showNotification}
                addNew={this.addNew}
              />
            )}
          />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
