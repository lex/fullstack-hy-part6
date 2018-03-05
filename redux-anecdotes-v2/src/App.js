import React from 'react';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import {
    createNotification,
    destroyNotification,
} from './reducers/notificationReducer';

class App extends React.Component {
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

export default App;
