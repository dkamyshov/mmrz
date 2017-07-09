import {StorageInterface} from '../types';
import {Store} from 'redux';

class ManagementActions {
    store: Store<StorageInterface>;

    constructor(store: Store<StorageInterface>) {
        this.store = store;

        this.addGroup = this.addGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.toggleGroup = this.toggleGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.updatePairsParent = this.updatePairsParent.bind(this);
        this.publishGroup = this.publishGroup.bind(this);
        this.updateDirection = this.updateDirection.bind(this);
        this.updateMark = this.updateMark.bind(this);
        this.removeWord = this.removeWord.bind(this);
        this.addWord = this.addWord.bind(this);
    }

    addGroup(name: string) {
        this.store.dispatch({
            type: 'GROUP_ADD',
            name: name
        });
    }

    removeGroup(gid: number) {
        this.store.dispatch({
            type: 'GROUP_REMOVE',
            groupId: gid
        });
    }

    toggleGroup(gid: number) {
        this.store.dispatch({
            type: 'GROUP_TOGGLE',
            groupId: gid
        });
    }

    renameGroup(gid: number) {
        let newName = prompt("Введите новое имя группы:");

        if(newName != null && newName.trim() != "") {
            this.store.dispatch({
                type: 'GROUP_RENAME',
                groupId: gid,
                name: newName
            });
        }
    }

    updatePairsParent(gid: number) {
        this.store.dispatch({
            type: 'UPDATE_PAIRS_PARENT',
            groupId: gid
        });
    }

    publishGroup(gid: number) {
        const state = this.store.getState();

        const publishInfo = {
            name: state.groups.find(g => g.id == gid).name,
            pairs: state.pairs.filter(p => p.gid == gid).map(p => ({
                en: p.en,
                ru: p.ru,
                direction: p.pd
            }))
        };

        let data = new FormData();

        data.append("data", JSON.stringify(publishInfo));

        fetch("./mmrz.php?action=publish_group", {
            method: "POST",
            body: data
        }).then((response) => {
            if(response.status == 200) {
                return response.json();
            } else {
                throw "Error.";
            }
        }).then((json) => {
            if(json.status != 'ok') {
                console.error(json.message);
                throw "Error.";
            } else {
                this.store.dispatch({
                    type: 'SET_GROUP_LINK',
                    link: json.link,
                    groupId: gid
                });
            }
        }).catch(e => {
            // do nothing
        });
    }

    updateMark(id: number) {
        this.store.dispatch({
            type: 'UPDATE_MARK',
            pairId: id
        });
    }

    updateDirection(id: number, direction: number) {
        this.store.dispatch({
            type: 'UPDATE_DIRECTION',
            pairId: id,
            direction: direction
        });
    }

    removeWord(id: number) {
        this.store.dispatch({
            type: 'REMOVE_WORD',
            pairId: id
        });
    }

    addWord(gid: number, en: string, ru: string) {
        this.store.dispatch({
            type: 'ADD_WORD',
            groupId: gid,
            en: en,
            ru: ru
        });
    }
}

export default ManagementActions;
