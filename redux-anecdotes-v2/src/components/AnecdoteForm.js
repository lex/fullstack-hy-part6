import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdotes from '../services/anecdotes';

class AnecdoteForm extends React.Component {
    handleSubmit = async e => {
        e.persist();
        e.preventDefault();

        const anecdote = e.target.anecdote.value;

        this.props.createAnecdote(anecdote);
        this.props.showNotification(`you added '${anecdote}'`);

        e.target.anecdote.value = '';
    };

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input name="anecdote" />
                    </div>
                    <button>create</button>
                </form>
            </div>
        );
    }
}

export default connect(null, { createAnecdote })(AnecdoteForm);
