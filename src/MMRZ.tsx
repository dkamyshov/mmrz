import * as React from 'react';
import {Component} from 'react';
import {StorageInterface} from './types';
import {Store} from 'redux';

import screens from './helpers/screens';
import ManagementActions from './helpers/ManagementActions';

import Dummy            from './screens/Dummy';
import NoLS             from './screens/NoLS';
import Welcome          from './screens/Welcome';
import Introduction     from './screens/Introduction';
import Management       from './screens/Management';
import Main             from './screens/Main';
import Settings         from './screens/Settings';
import GroupOptions     from './screens/GroupOptions';
import Learn            from './screens/Learn';
import Game             from './screens/Game';

const calculateAvailableWords = (pairs, opts) => pairs.reduce((r, p) => opts.indexOf(p.gid) != -1 ? r + 1 : r, 0);

class MMRZ extends Component<any, any> {
    store: Store<StorageInterface>;

    constructor(props) {
        super(props);
        this.state = {internalError: false, errorCode: 0, screen: screens.loading};
        this.goToScreen             = this.goToScreen.bind(this);
        this.toggleGroupOption      = this.toggleGroupOption.bind(this);
        this.updateSettings         = this.updateSettings.bind(this);
        this.store = props.store;
    }

    componentDidMount() {
        let screenToShow;

        const {groups} = this.store.getState(),
              link = window.location.hash.substring(1);

        if(window.location.hash != "" && !groups.reduce((r, g) => r || (g.published == link), false)) {
            let data = new FormData();

            data.append("link", link);

            fetch("/mmrz.php?action=fetch_group", {
                method: "POST",
                body: data
            }).then((response) => {
                if(response.status == 200) {
                    return response.json();
                } else {
                    throw "Error.";
                }
            }).then(json => {
                if(json.status != 'ok') {
                    console.error(json.message);
                    throw "Error.";
                } else {
                    this.store.dispatch({
                        type: 'LOAD_GROUP',
                        groupId: (Math.max(...groups.map(g => g.id)) + 1) | 0,
                        name: json.name,
                        pairs: json.pairs,
                        link: json.link
                    });

                    this.setState({
                        screen: screens.management
                    });
                }
            }).catch((e) => {
                console.error("An error occured attempting to fetch group. "+e.message+"\nFalling back to default routine.");
                this.defaultRoutine();
            });
        } else {
            this.defaultRoutine();
        }
    }

    defaultRoutine() {
        let screenToShow;
        const state = this.store.getState();

        if(state.pairs.length > 0) {
            if(state.pairs.length > 3) {
                screenToShow = screens.main;
            } else {
                screenToShow = screens.management;
            }
        } else {
            screenToShow = screens.welcome;
        }

        this.setState({
            screen: screenToShow
        });
    }

    goToScreen(name: string) {
        if(!(name in screens)) {
            this.setState({
                internalError: true,
                errorCode: 1
            });

            return;
        }

        this.setState({
            screen: name
        });
    }

    updateSettings(so) {
        this.store.dispatch({
            type: 'UPDATE_SETTINGS',
            settings: so
        });
    }

    toggleGroupOption(id) {
        this.store.dispatch({
            type: 'TOGGLE_GROUP_OPTION',
            groupId: id
        })
    }

    render() {
        const {internalError, screen} = this.state;
        const dispatch = this.store;

        if(!localStorage) {
            return <NoLS />;
        } else {
            if(internalError) {
                return <h1>Произошла внутренняя ошибка ({this.state.errorCode})!</h1>;
            } else {
                switch(screen) {
                    case screens.loading:
                        return <h1>Загрузка...</h1>;

                    case screens.dummy:
                        return <Dummy store={this.store}/>;

                    case screens.welcome:
                        return <Welcome ok={() => this.goToScreen(screens.introduction)} />;

                    case screens.introduction:
                        return <Introduction ok={() => this.goToScreen(screens.management)}/>;

                    case screens.management: {
                        const {pairs, groups} = this.store.getState();

                        const view = groups.sort((a, b) => a.id - b.id).map(g => {
                            return {
                                ...g,
                                pairsCount: pairs.reduce((result, p) => result + (p.gid == g.id ? 1 : 0), 0),
                                pairs: g.collapsed ? null : pairs.reduce((result, p) => {
                                    return p.gid == g.id ? [...result, p] : result;
                                }, []).sort((a, b) => a.id - b.id)
                            };
                        });

                        return <Management ok={() => this.goToScreen(screens.main)}
                                           view={view}
                                           actions={new ManagementActions(this.store)}
                                           totalPairs={pairs.length}/>;
                    }

                    case screens.main:
                        return <Main goToManagement={() => this.goToScreen(screens.management)}
                                     goToSettings={() => this.goToScreen(screens.settings)}
                                     goToGroupOptionsLearn={() => this.goToScreen(screens.groupoptionslearn)}
                                     goToGroupOptionsGame={() => this.goToScreen(screens.groupoptionsgame)}/>;

                    case screens.settings: {
                        const {settings} = this.store.getState();
                        return <Settings settings={settings}
                                         updateSettings={this.updateSettings}
                                         ok={() => this.goToScreen(screens.main)}/>;
                    }

                    case screens.groupoptionsgame:
                    case screens.groupoptionslearn: {
                        const state = this.store.getState(),
                        groups = state.groups.map(g => ({
                            id: g.id,
                            name: g.name,
                            pairs: state.pairs.reduce((r, p) => p.gid === g.id ? r + 1 : r, 0),
                            active: state.settings.groupOptions.indexOf(g.id) != -1
                        })),
                        mayProceed = calculateAvailableWords(state.pairs, state.settings.groupOptions) >= 4;

                        return <GroupOptions groups={groups}
                                             mayProceed={mayProceed}
                                             ok={() => this.goToScreen(screen == screens.groupoptionslearn ? screens.learn : screens.game)}
                                             toggleGroupOption={this.toggleGroupOption}/>;
                    }

                    case screens.learn: {
                        const {pairs: pairs, settings: {groupOptions, gameLength}} = this.store.getState();

                        return <Learn pairs={pairs.filter(p => groupOptions.indexOf(p.gid) !== -1)}
                                      length={gameLength}
                                      exit={() => this.goToScreen(screens.main)} />;
                    }

                    case screens.game:
                        return <Game store={this.store}
                                      exit={() => this.goToScreen(screens.main)} />;

                    default:
                        return <Dummy />;
                }
            }
        }
    }
}

export default MMRZ;
