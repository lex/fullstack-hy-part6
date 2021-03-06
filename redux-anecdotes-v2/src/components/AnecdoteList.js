import React from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';
import anecdotes from '../services/anecdotes';

class AnecdoteList extends React.Component {
    vote = async anecdote => {
        this.props.voteAnecdote(anecdote);
        this.props.showNotification(`you voted for '${anecdote.content}'`, 2);
    };

    render() {
        return (
            <div>
                <h2>Anecdotes</h2>

                <Filter />

                {this.props.anecdotes.map(a => (
                    <div key={a.id}>
                        <div>{a.content}</div>

                        <div>
                            has {a.votes}
                            <button onClick={() => this.vote(a)}>vote</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const anecdotesToShow = (anecdotes, filter) =>
    anecdotes
        .filter(a =>
            a.content.toLowerCase().includes(filter.filter.toLowerCase()),
        )
        .sort((a, b) => b.votes - a.votes);

const mapStateToProps = state => {
    return {
        anecdotes: anecdotesToShow(state.anecdotes, state.filter),
    };
};

export default connect(mapStateToProps, { voteAnecdote, showNotification })(
    AnecdoteList,
);
