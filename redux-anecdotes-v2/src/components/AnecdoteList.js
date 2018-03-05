import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';

class AnecdoteList extends React.Component {
    vote = anecdote => {
        this.props.store.dispatch(voteAnecdote(anecdote));
        this.props.showNotification(`you voted for '${anecdote.content}'`);
    };

    render() {
        const anecdotes = this.props.store.getState().anecdotes;

        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>

                        <div>
                            has {anecdote.votes}
                            <button onClick={() => this.vote(anecdote)}>
                                vote
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default AnecdoteList;
