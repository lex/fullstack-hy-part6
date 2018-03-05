const FILTER_SET = 'FILTER_SET';

const initialState = { filter: '' };

const reducer = (store = initialState, action) => {
    if (action.type === FILTER_SET) {
        return { filter: action.filter };
    }

    return store;
};

export const setFilter = filter => {
    return {
        type: FILTER_SET,
        filter,
    };
};

export default reducer;
