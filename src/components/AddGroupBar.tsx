import * as React from 'react';
import {Component} from 'react';
import ManagementActions from '../helpers/ManagementActions';

class AddGroupBar extends Component<any, any> {
    actions: ManagementActions;

    constructor(props) {
        super(props);

        this.state = {name: ""};

        this.actions = props.actions;

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.addGroup = this.addGroup.bind(this);
    }

    handleChange(evt) {
        this.setState({
            name: evt.target.value
        });
    }

    handleKeyDown(evt) {
        if(evt.key == "Enter") {
            this.addGroup();
        }
    }

    addGroup() {
        const {name} = this.state;
        const {actions} = this.props;

        if(name.trim() != "") {
            actions.addGroup(name);

            this.setState({
                name: ""
            });
        }
    }

    render() {
        return <div className="mmrz__group add">
            <div className="mmrz__group__header grid">
                <div className="mmrz__group__header__element left">
                    Добавить группу:
                </div>

                <div className="mmrz__group__header__element left">
                    <input value={this.state.name} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
                </div>

                <div className="mmrz__group__header__element left">
                    <span className="link-control" onClick={this.addGroup}>Добавить</span>
                </div>
            </div>
        </div>;
    }
}

export default AddGroupBar;
