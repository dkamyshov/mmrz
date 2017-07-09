import {StorageInterfacePair, ActionInterface} from '../types';

const reducer = (_:Array<StorageInterfacePair>, action:ActionInterface):Array<StorageInterfacePair> => {
    const {pairId, groupId, direction, en, ru, pairs} = action;

    if(_ == undefined) {
        return [];
    }

    switch(action.type) {
        case 'REMOVE_WORD': {
            return _.filter(p => p.id !== pairId);
        }

        case 'UPDATE_MARK': {
            return _.map(p => p.id === pairId ? (
                {
                    ...p,
                    marked: !p.marked
                }
            ) : (
                p
            ));
        }

        case 'UPDATE_DIRECTION': {
            return _.map(p => p.id === pairId ? (
                {
                    ...p,
                    pd: direction
                }
            ) : (
                p
            ));
        }

        case 'UPDATE_GROUP_DIRECTION': {
            return _.map(p => p.gid === groupId ? (
                {
                    ...p,
                    pd: direction
                }
            ) : (
                p
            ));
        }

        case 'UPDATE_PAIRS_PARENT': {
            return _.map(p => p.marked ? (
                {
                    ...p,
                    gid: groupId,
                    marked: false
                }
            ) : (
                p
            ));
        }

        case 'ADD_WORD': {
            return [
                ..._,
                {
                    id: (Math.max(..._.map(p => p.id)) + 1) | 0,
                    gid: groupId,
                    en: en,
                    ru: ru,
                    pd: 0,
                    marked: false
                }
            ];
        }

        case 'LOAD_GROUP': {
            let pid = (Math.max(..._.map(p => p.id)) + 1) | 0;

            return [
                ..._,
                ...pairs.map(p => (
                    {
                        id: pid++,
                        gid: groupId,
                        en: p.en,
                        ru: p.ru,
                        pd: Number(p.pd) || 0,
                        marked: false
                    }
                ))
            ];
        }

        case 'GROUP_REMOVE': {
            return _.filter(p => p.gid !== groupId);
        }

        default: return _;
    }
}

export default reducer;
