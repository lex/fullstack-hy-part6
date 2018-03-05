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
        const anecdotes = this.props.anecdotes;

        const a = () => {
            return anecdotes
                .filter(a =>
                    a.content
                        .toLowerCase()
                        .includes(this.props.filter.filter.toLowerCase()),
                )
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>

                        <div>
                            has {anecdote.votes}
                            <button onClick={() => this.vote(anecdote)}>
                                vote
                            </button>
                        </div>
                    </div>
                ));
        };

        return (
            <div>
                <h2>Anecdotes</h2>

                <Filter />

                {a()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    };
};

export default connect(mapStateToProps, { voteAnecdote })(AnecdoteList);
