import axios from 'axios';

const url = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(url);
    return response.data;
};

const add = async anecdote => {
    const model = { content: anecdote, votes: 0 };
    const response = await axios.post(url, model);
    return response.data;
};

const update = async anecdote => {
    const response = await axios.put(`${url}/${anecdote.id}`, anecdote);
    return response.data;
};

export default { getAll, add, update };
