"use strict";

var calculatePayment = function calculatePayment(principal, years, rate) {
    var monthlyRate = rate / 100 / 12;
    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
    var balance = principal;
    var amortization = [];
    for (var y = 0; y < years; y++) {
        var interestY = 0; //Interest payment for year y
        var principalY = 0; //Principal payment for year y
        for (var m = 0; m < 12; m++) {
            var interestM = balance * monthlyRate; //Interest payment for month m
            var principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({ principalY: principalY, interestY: interestY, balance: balance });
    }
    return { monthlyPayment: monthlyPayment, amortization: amortization };
};

var Header = React.createClass({
    displayName: "Header",

    render: function render() {
        return React.createElement(
            "header",
            null,
            React.createElement(
                "h1",
                null,
                this.props.title
            )
        );
    }
});

var AmortizationChart = React.createClass({
    displayName: "AmortizationChart",

    render: function render() {
        var items = this.props.data.map(function (year, index) {
            return React.createElement(
                "tr",
                { key: index },
                React.createElement(
                    "td",
                    null,
                    index + 1
                ),
                React.createElement(
                    "td",
                    { className: "currency principal" },
                    Math.round(year.principalY).toLocaleString()
                ),
                React.createElement(
                    "td",
                    { className: "stretch" },
                    React.createElement(
                        "div",
                        { className: "flex" },
                        React.createElement("div", { className: "bar principal", style: { flex: year.principalY, WebkitFlex: year.principalY } }),
                        React.createElement("div", { className: "bar interest", style: { flex: year.interestY, WebkitFlex: year.interestY } })
                    )
                ),
                React.createElement(
                    "td",
                    { className: "currency interest" },
                    Math.round(year.interestY).toLocaleString()
                ),
                React.createElement(
                    "td",
                    { className: "currency" },
                    Math.round(year.balance).toLocaleString()
                )
            );
        });
        return React.createElement(
            "table",
            null,
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "Year"
                    ),
                    React.createElement(
                        "th",
                        { className: "principal" },
                        "Principal"
                    ),
                    React.createElement("th", { className: "stretch" }),
                    React.createElement(
                        "th",
                        { className: "interest" },
                        "Interest"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Balance"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                items
            )
        );
    }
});

var MortgageCalculator = React.createClass({
    displayName: "MortgageCalculator",

    getInitialState: function getInitialState() {
        return {
            principal: this.props.principal,
            years: this.props.years,
            rate: this.props.rate
        };
    },
    principalChange: function principalChange(event) {
        this.setState({ principal: event.target.value });
    },
    yearsChange: function yearsChange(event) {
        this.setState({ years: event.target.value });
    },
    rateChange: function rateChange(event) {
        this.setState({ rate: event.target.value });
    },
    render: function render() {
        var payment = calculatePayment(this.state.principal, this.state.years, this.state.rate);
        var monthlyPayment = payment.monthlyPayment;
        var amortization = payment.amortization;
        return React.createElement(
            "div",
            { className: "content" },
            React.createElement(
                "div",
                { className: "form" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Principal:"
                    ),
                    React.createElement("input", { type: "text", value: this.state.principal, onChange: this.principalChange })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Years:"
                    ),
                    React.createElement("input", { type: "text", value: this.state.years, onChange: this.yearsChange })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        { htmlFor: "rate" },
                        "Rate:"
                    ),
                    React.createElement("input", { type: "text", value: this.state.rate, onChange: this.rateChange })
                )
            ),
            React.createElement(
                "h2",
                null,
                "Monthly Payment: ",
                React.createElement(
                    "span",
                    { className: "currency" },
                    Number(monthlyPayment.toFixed(2)).toLocaleString()
                )
            ),
            React.createElement(AmortizationChart, { data: amortization })
        );
    }
});

var App = React.createClass({
    displayName: "App",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Header, { title: "React Mortgage Calculator" }),
            React.createElement(MortgageCalculator, { principal: "200000", years: "30", rate: "5" })
        );
    }
});

React.render(React.createElement(App, null), document.body);
