import * as React from 'react';
import {Component} from 'react';

class Main extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mmrz__screen">
            <div className="pull-center">
                <input type="button" className="blue block" value="Управление словами" onClick={this.props.goToManagement}/>
                <input type="button" className="blue block" value="Настройки" onClick={this.props.goToSettings}/>
                <input type="button" className="blue block" value="Учить слова" onClick={this.props.goToGroupOptionsLearn}/>
                <input type="button" className="blue block" value="Играть" onClick={this.props.goToGroupOptionsGame}/>
            </div>
        </div>;
    }
}

export default Main;