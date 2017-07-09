import {StorageInterfaceGroup, ActionInterface} from '../types';

const reducer = (_:Array<StorageInterfaceGroup>, action:ActionInterface):Array<StorageInterfaceGroup> => {
    const {groupId, name, link} = action;

    if(_ == undefined) {
        return [
            {
                id: 0,
                name: "Стандартная группа",
                collapsed: false,
                published: false
            }
        ];
    }

    switch(action.type) {
        case 'GROUP_TOGGLE': {
            return _.map(g => g.id === groupId ? (
                {
                    ...g,
                    collapsed: !g.collapsed
                }
            ) : (
                g
            ));
        }

        case 'GROUP_ADD': {
            return [
                ..._,
                {
                    id: (Math.max(..._.map(g => g.id)) + 1) | 0,
                    name: name,
                    collapsed: false,
                    published: false
                }
            ];
        }

        case 'LOAD_GROUP': {
            return [
                ..._,
                {
                    id: groupId,
                    name: name,
                    collapsed: false,
                    published: link
                }
            ];
        }

        case 'SET_GROUP_LINK': {
            return _.map(g => (
                g.id === groupId ? (
                    {
                        ...g,
                        published: link
                    }
                ) : g
            ));
        }

        case 'GROUP_RENAME': {
            return _.map(g => (
                g.id === groupId ? (
                    {
                        ...g,
                        name: name
                    }
                ) : (
                    g
                )
            ));
        }

        case 'GROUP_REMOVE': {
            return _.filter(g => g.id !== groupId);
        }

        default: return _;
    }
}

export default reducer;
