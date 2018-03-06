const NOTIFICATION_CREATE = 'NOTIFICATION_CREATE';
const NOTIFICATION_DESTROY = 'NOTIFICATION_DESTROY';

const initialState = { message: '' };

const reducer = (store = initialState, action) => {
    if (action.type === NOTIFICATION_CREATE) {
        return { message: action.message };
    }

    if (action.type === NOTIFICATION_DESTROY) {
        return { ...initialState };
    }

    return store;
};

export const showNotification = (message, delay) => {
    return async dispatch => {
        dispatch({
            type: NOTIFICATION_CREATE,
            message,
        });

        setTimeout(() => {
            dispatch({
                type: NOTIFICATION_DESTROY,
            });
        }, delay * 1000);
    };
};

export default reducer;
