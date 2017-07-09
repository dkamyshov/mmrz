import * as React from 'react';
import {Component} from 'react';

import AddPairBar from '../components/AddPairBar';
import AddGroupBar from '../components/AddGroupBar';
import GroupEntry from '../components/GroupEntry';

import ManagementActions from '../helpers/ManagementActions';

const appLink = "http://mmrz.dev/";

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

class Management extends Component<any, any> {
    store: any;
    actions: ManagementActions;

    constructor(props) {
        super(props);
        this.actions = props.actions;
        this.updatePairsParentSelect = this.updatePairsParentSelect.bind(this);
        this.state = {
            toGroup: 0
        };
    }

    updatePairsParentSelect(evt) {
        this.setState({
            toGroup: Number(evt.target.value)
        });
    }

    render() {
        const actions = this.actions;
        return <div className="mmrz__screen">
            <h1>Управление словами</h1>

            {
                this.props.view.map(({id, name, collapsed, pairsCount, pairs, published}) => (
                    <div key={id} className="mmrz__group">
                        <div className="mmrz__group__header grid">
                            <div className="mmrz__group__header__element left">
                                <span className="link-control" onClick={actions.toggleGroup.bind(this, id)}>
                                    {name}
                                </span>
                            </div>

                            <div className="mmrz__group__header__element left">
                                <span className="link-control" onClick={actions.renameGroup.bind(this, id)}>
                                    [ред.]
                                </span>
                            </div>

                            {
                                pairs != null ? (
                                    pairs.reduce((r, p) => r || p.marked, false) ? (
                                        <div>
                                            <div className="mmrz__group__header__element left">
                                                Перенести в:
                                            </div>

                                            <div className="mmrz__group__header__element input left">
                                                <select value={this.state.toGroup} onChange={this.updatePairsParentSelect}>
                                                    {
                                                        this.props.view.map(g => (
                                                            <option key={g.id} value={g.id}>{g.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            <div className="mmrz__group__header__element left">
                                                <span className="link-control" onClick={() => actions.updatePairsParent(this.state.toGroup)}>
                                                    Перенести
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )
                                ) : (
                                    ""
                                )
                            }

                            <div className="mmrz__group__header__element right">
                                {id === 0 ? (
                                    ""
                                ) : (
                                    <span className="link-control danger" onClick={actions.removeGroup.bind(this, id)}>
                                        Удалить
                                    </span>
                                )}
                            </div>

                            <div className="mmrz__group__header__element right">
                                {id === 0 || pairsCount < 1 ? (
                                    ""
                                ) : (
                                    published ? (
                                        <span className="link-control good">{appLink + '#' + published}</span>
                                    ) : (
                                        <span className="link-control good" onClick={actions.publishGroup.bind(this, id)}>
                                            Опубликовать
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {
                            collapsed ? (
                                ""
                            ) : (
                                <div className="mmrz__group__container">
                                    <table>
                                        <thead>
                                            <tr className="hightlighted-row">
                                                <th>Английский</th>
                                                <th>Русский</th>
                                                <th>Направление</th>
                                                <th>Управление</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                pairs.map(({id, en, ru, pd, marked}) => (
                                                    <tr onClick={actions.updateMark.bind(this, id)} key={id} className={marked ? "selected" : ""}>
                                                        <td>{(en)}</td>
                                                        <td>{(ru)}</td>
                                                        <td className="input">
                                                            <select value={Number(pd) || 0} onClick={(evt) => evt.stopPropagation()} onChange={(evt) => {actions.updateDirection(id, Number(evt.target.value))}}>
                                                                <option value={0}>---</option>
                                                                <option value={1}>EN-RU</option>
                                                                <option value={2}>RU-EN</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                             <span className="link-control danger" onClick={(evt) => {
                                                                 actions.removeWord(id);
                                                                 evt.stopPropagation();
                                                             }}>Удалить</span>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                            <AddPairBar addWord={actions.addWord.bind(this, id)} />
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                ))
            }

            <AddGroupBar actions={this.props.actions} />
            <div className="pull-right">
                <input type="button" className="green" value={this.props.totalPairs < 4 ? "Необходимо как минимум 4 пары!" : "OK"} disabled={this.props.totalPairs < 4} onClick={this.props.ok}/>
            </div>
        </div>;
    }
}

export default Management;
