import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentRate: {}
        }
    }

    componentDidMount() {
        this.getBPI().then((data) => {
            this.setState({
                loading: false,
                currentRate: data,
                prevRate: data
            })
        })
    }

    getBPI = async() => {
        const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
        const response = await fetch(url);
        return await response.json()
            .then((res) => {
                return {
                    EUR: res.bpi.EUR.rate_float,
                    GBP: res.bpi.GBP.rate_float,
                    USD: res.bpi.USD.rate_float,
                }
            });
    }

    refresh = () => {
        this.getBPI().then((data) => {
            this.setState(prevState => ({
                loading: false,
                currentRate: data,
                prevRate: prevState.currentRate
            }))
        })
    }

    getDelte = (prev, current) => {
        return (current - prev) > 0 ? "+" + (current - prev) : (current - prev)
    }

    render() {
        const {loading, prevRate, currentRate} = this.state;

        return <div>
            {loading ? <div>Loading...</div> :
                <table border="1">
                    <thead>
                    <tr>
                        <th> </th>
                        <th>Previous</th>
                        <th>Current</th>
                        <th>Delta</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>&euro;</th>
                        <td>{prevRate.EUR}</td>
                        <td>{currentRate.EUR}</td>
                        <td>{this.getDelte(prevRate.EUR,currentRate.EUR)}</td>
                    </tr>
                    <tr>
                        <th>&pound;</th>
                        <td>{prevRate.GBP}</td>
                        <td>{currentRate.GBP}</td>
                        <td>{this.getDelte(prevRate.GBP, currentRate.GBP)}</td>
                    </tr>
                    <tr>
                        <th>&#36;</th>
                        <td>{prevRate.USD}</td>
                        <td>{currentRate.USD}</td>
                        <td>{this.getDelte(prevRate.USD, currentRate.USD)}</td>
                    </tr>
                    </tbody>
                </table>
            }
            <button onClick={this.refresh}>Refresh</button>
        </div>
    }

}

export default App;
