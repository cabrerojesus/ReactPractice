import React from "react";

export class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calc: '',
            calculations: [],
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e) => {
        if (e.target.value === '=' && (this.state.calc.includes('+') ||
            this.state.calc.includes('-') || this.state.calc.includes('*') || this.state.calc.includes('/'))) {
            let result = this.state.calc + '=' + this.calculate();
            let temp = this.state.calculations
            temp.push(result)
            this.setState({ calculations: temp, calc: '' })
        } else if (e.target.value === 'C') {
            this.clearScren()
        } else this.addToScreen(e)
    }

    addToScreen = (e) => {
        if (!this.state.isComplete) {
            this.setState((prevState) => ({
                calc: prevState.calc + e.target.value
            }))
        }
    }

    clearScren = () => {
        this.setState({
            calc: '',
            isComplete: false
        })
    }

    calculate = () => {
        let num1 = 0;
        let num2 = 0;
        let result = 0;
        if (this.state.calc.includes('+')) {
            num1 = parseInt(this.state.calc.substring(0, this.state.calc.indexOf('+')))
            num2 = parseInt(this.state.calc.substring(this.state.calc.indexOf('+') + 1))
            result = num1 + num2;
        } else if (this.state.calc.includes('-')) {
            num1 = parseInt(this.state.calc.substring(0, this.state.calc.indexOf('-')))
            num2 = parseInt(this.state.calc.substring(this.state.calc.indexOf('-') + 1))
            result = num1 - num2;
        }
        else if (this.state.calc.includes('/')) {
            num1 = parseInt(this.state.calc.substring(0, this.state.calc.indexOf('/')))
            num2 = parseInt(this.state.calc.substring(this.state.calc.indexOf('/') + 1))
            result = num1 / num2;
        }
        else if (this.state.calc.includes('*')) {
            num1 = parseInt(this.state.calc.substring(0, this.state.calc.indexOf('*')))
            num2 = parseInt(this.state.calc.substring(this.state.calc.indexOf('*') + 1))
            result = num1 * num2;
        }
        return result;
    }

    render() {
        return (
            <>
                <Screen value={this.state.calc} />
                <NumberPad onClick={this.handleClick} />
                <CalculationsList calculations={this.state.calculations} />
            </>
        )
    }
}

function Screen(props) {
    return (
        <input className="calcScreen" type='text' placeholder="0" readOnly value={props.value} />
    )
}


function NumberPad(props) {
    const buttonValues = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 'C', 0, '/', '=']
    const numPad = buttonValues.map(e => {
        return (
            <button key={e} value={e} onClick={props.onClick} >
                {e}
            </button>
        )
    })
    return (
        <div className="calcButtons">
            {numPad}
        </div>
    )
}

function CalculationsList(props) {
    let calculations = props.calculations.map((e) => {
        return (
            <li>{e}</li>
        )
    })
    return (
        <ul>
            {calculations}
        </ul>
    )
}