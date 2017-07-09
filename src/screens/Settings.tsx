import * as React from 'react';
import {Component} from 'react';

class Settings extends Component<any, any> {
    constructor(props) {
        super(props);
        
        const {settings} = this.props;

        this.state = {
            avoidDoubles: settings.avoidDoubles,
            useTimer: settings.useTimer,
            timerDelay: settings.timerDelay,
            areaValue: ""
        };

        this.finishEditing = this.finishEditing.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    finishEditing() {
        const {updateSettings, ok} = this.props;

        if(true) {
            updateSettings(this.state);
            ok();
        }
    }

    handleCheckboxChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.checked
        });
    }

    handleInputChange(evt) {
        if(!isNaN(Number(evt.target.value))) {
            this.setState({
                timerDelay: Number(evt.target.value)*1000.0
            });
        }
    }

    handleAreaChange(evt) {
        this.setState({
            areaValue: evt.target.value
        });
    }

    render() {
        const {avoidDoubles, useTimer, timerDelay} = this.state;

        return <div className="mmrz__screen">
            Стараться избегать дублей в словах: <input checked={avoidDoubles} type="checkbox" name="avoidDoubles" onChange={this.handleCheckboxChange}/><br/>
            Использовать таймер: <input checked={useTimer} type="checkbox" name="useTimer" onChange={this.handleCheckboxChange}/><br/>
            Задержка таймера (с): <input type="range" min={0.1} max={15.0} step={0.1} value={timerDelay/1000.0} onChange={this.handleInputChange}/> ({timerDelay/1000.0})
            <div className="pull-right">
                <input type="button" className="blue" onClick={this.finishEditing} value="OK"/>
            </div>
        </div>;
    }
}

export default Settings;
