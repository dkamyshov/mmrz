import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component} from 'react';

class GroupEntry extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mmrz__group__entry grid">
            <div className="col-1-4 ru-en">
                {this.props.en}
            </div>

            <div className="col-1-4 ru-en">
                {this.props.ru}
            </div>

            <div className="col-1-4">
                <select value={this.props.direction} onChange={(evt) => this.props.updateDirection(Number(evt.target.value))}>
                    <option value={0}>---</option>
                    <option value={1}>EN-RU</option>
                    <option value={2}>RU-EN</option>
                </select>
            </div>

            <div className="col-1-4 ru-en">
                <a href="#" onClick={this.props.remove}>Удалить</a>
            </div>
        </div>;
    }
}

export default GroupEntry;
