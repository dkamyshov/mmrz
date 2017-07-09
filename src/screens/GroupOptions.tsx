import * as React from 'react';
import {Component} from 'react';

class GroupOptions extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {groups, mayProceed, ok, toggleGroupOption} = this.props;
        return <div className="mmrz__screen">
            <h1>Выберите группы слов:</h1>

            {
                groups.map((g, i) => (
                    <div key={i}>
                        {g.name} (пар: {g.pairs}) <input type="checkbox" onChange={() => toggleGroupOption(g.id)} checked={g.active} />
                    </div>
                ))
            }

            <div className="pull-right">
                <input type="button" className="green" onClick={ok} disabled={!mayProceed} value={mayProceed ? "Далее" : "Наберите как минимум 4 пары"}/>
            </div>
        </div>;
    }
}

export default GroupOptions;
