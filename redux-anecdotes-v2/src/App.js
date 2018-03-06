import React from 'react';
import { connect } from 'react-redux';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import {
    createNotification,
    destroyNotification,
} from './reducers/notificationReducer';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

class App extends React.Component {
    componentDidMount() {
        this.props.initializeAnecdotes();
    }

    showNotification = text => {
        const delay = 5000;
        this.props.store.dispatch(createNotification(text));
        setTimeout(() => {
            this.clearNotification();
        }, delay);
    };

    clearNotification = () => {
        this.props.store.dispatch(destroyNotification());
    };

    render() {
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Notification />
                <AnecdoteList showNotification={this.showNotification} />
                <AnecdoteForm showNotification={this.showNotification} />
            </div>
        );
    }
}

export default connect(null, { initializeAnecdotes })(App);
