import {StorageInterfaceSettings, ActionInterface} from '../types';

const reducer = (_:StorageInterfaceSettings, action:ActionInterface):StorageInterfaceSettings => {
    const {settings, groupId} = action;

    if(_ == undefined) {
        return {
            avoidDoubles: true,
            useTimer: false,
            groupOptions: [0],
            gameLength: 10,
            timerDelay: 5000
        };
    }

    switch(action.type) {
        case 'UPDATE_SETTINGS': {
            return {
                ..._,
                useTimer: settings.useTimer,
                timerDelay: settings.timerDelay,
                avoidDoubles: settings.avoidDoubles
            };
        }

        case 'TOGGLE_GROUP_OPTION': {
            return {
                ..._,
                groupOptions: (
                    _.groupOptions.indexOf(groupId) !== -1 ? (
                        _.groupOptions.filter(gid => gid !== groupId)
                    ) : (
                        [..._.groupOptions, groupId]
                    )
                )
            };
        }

        default: return _;
    }
}

export default reducer;
