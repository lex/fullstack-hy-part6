const ANECDOTE_CREATE = 'ANECDOTE_CREATE';
const ANECDOTE_VOTE = 'ANECDOTE_VOTE';
const ANECDOTE_INIT = 'ANECDOTE_INIT';

const reducer = (store = [], action) => {
    if (action.type === ANECDOTE_VOTE) {
        const old = store.filter(a => a.id !== action.data.id);
        const voted = store.find(a => a.id === action.data.id);

        return [...old, { ...voted, votes: voted.votes + 1 }];
    }

    if (action.type === ANECDOTE_CREATE) {
        return [
            ...store,
            {
                content: action.data.content,
                id: action.data.id,
                votes: action.data.votes,
            },
        ];
    }

    if (action.type === ANECDOTE_INIT) {
        return action.data;
    }

    return store;
};

export const createAnecdote = content => {
    return {
        type: ANECDOTE_CREATE,
        data: {
            id: content.id,
            content: content.content,
            votes: content.votes,
        },
    };
};

export const voteAnecdote = anecdote => {
    return {
        type: ANECDOTE_VOTE,
        data: {
            id: anecdote.id,
        },
    };
};

export const initializeAnecdotes = anecdotes => {
    return {
        type: ANECDOTE_INIT,
        data: anecdotes,
    };
};

export default reducer;
