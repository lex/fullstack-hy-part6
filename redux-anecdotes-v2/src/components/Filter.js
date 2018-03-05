import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

class Filter extends React.Component {
    handleChange = event => {
        const filter = event.target.value;
        this.props.setFilter(filter);
    };

    render() {
        const style = {
            marginBottom: 10,
        };

        return (
            <div style={style}>
                filter <input onChange={this.handleChange} />
            </div>
        );
    }
}

export default connect(null, { setFilter })(Filter);
