import * as React from 'react';
import {Component} from 'react';

class AddPairBar extends Component<any, any> {
    firstInput: HTMLElement;

    constructor(props) {
        super(props);
        this.state = {en: "", ru: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.addWord = this.addWord.bind(this);
    }

    handleChange(evt) {
        const name = evt.target.name;
        this.setState({
            [name]: evt.target.value
        });
    }

    handleKeyDown(evt) {
        if(evt.key == "Enter") {
            this.addWord();
        }
    }

    addWord() {
        const {en, ru} = this.state;

        if(en.trim() != "" && ru.trim() != "") {
            this.props.addWord(en.trim(), ru.trim());
            this.setState({
                en: "",
                ru: ""
            });
            this.firstInput.focus();
        }
    }

    render() {
        return <tr className="hightlighted-row">
            <td className="input">
                <input name="en" value={this.state.en} onChange={this.handleChange} onKeyDown={this.handleKeyDown} ref={(input) => this.firstInput = input}/>
            </td>

            <td className="input">
                <input name="ru" value={this.state.ru} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
            </td>

            <td>
                &nbsp;
            </td>

            <td>
                <span className="link-control" onClick={this.addWord}>Добавить пару</span>
            </td>
        </tr>;
    }
}

export default AddPairBar;
