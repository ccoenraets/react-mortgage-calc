import React from 'react';
import Header from './modules/Header';
import MortgageCalculator from './modules/MortgageCalculator';

let App = React.createClass({
    render() {
        return (
            <div>
                <Header title="React ES6 Mortgage Calculator"/>
                <MortgageCalculator principal="200000" years="30" rate="5"/>
            </div>
        );
    }
});

React.render(<App/>, document.body);