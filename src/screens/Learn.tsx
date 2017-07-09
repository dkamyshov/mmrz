import * as React from 'react';
import {Component} from 'react';

const formWordsArray = (available, length) => {
    let result = [];

    while(length-- > 0) {
        result.push(
            available[Math.floor(Math.random()*available.length)]
        );
    }

    return result;
}

class Learn extends Component<any, any> {
    constructor(props) {
        super(props);
        const {pairs, length} = props,
              list = formWordsArray(pairs, length);

        this.state = {
            list: list,
            pair: list[0],
            k: 0,
            total: list.length
        };

        this.nextPair = this.nextPair.bind(this);
    }

    nextPair() {
        const {k, total, list} = this.state;

        if(k + 1 >= total) {
            this.props.exit();
        } else {
            this.setState({
                ...this.state,
                k: k + 1,
                pair: list[k + 1]
            });
        }
    }

    render() {
        return <div className="mmrz__screen">
            {this.state.pair.en} - {this.state.pair.ru} <br/>
            <input type="button" className="green" value="Далее" onClick={this.nextPair} />
            <input type="button" className="red" value="Выйти" onClick={this.props.exit} />
        </div>;
    }
}

export default Learn;
