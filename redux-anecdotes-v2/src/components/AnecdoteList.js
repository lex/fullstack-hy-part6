import React from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { voteAnecdote } from '../reducers/anecdoteReducer';

class AnecdoteList extends React.Component {
    vote = anecdote => {
        this.props.voteAnecdote(anecdote);
        this.props.showNotification(`you voted for '${anecdote.content}'`);
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

export default connect(mapStateToProps, { voteAnecdote })(AnecdoteList);
