const NOTIFICATION_CREATE = 'CREATE';
const NOTIFICATION_DESTROY = 'DESTROY';

const initialState = { message: 'hello world' };

const reducer = (store = initialState, action) => {
    if (action.type === NOTIFICATION_CREATE) {
        return { message: action.message };
    }

    if (action.type === NOTIFICATION_DESTROY) {
        return initialState;
    }

    return store;
};

export const createNotification = message => {
    return {
        type: NOTIFICATION_CREATE,
        message,
    };
};

export const destroyNotification = () => {
    return {
        type: NOTIFICATION_DESTROY,
    };
};

export default reducer;