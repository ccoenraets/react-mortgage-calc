import React from 'react';

export default React.createClass({ // ES6: new object literals notation (function)
    render() {
        return (<header>
            <h1>{this.props.title}</h1>
        </header>);
    }
});
