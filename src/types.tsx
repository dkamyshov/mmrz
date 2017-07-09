interface StorageInterfaceSettings {
    avoidDoubles: boolean;
    groupOptions: Array<number>;
    gameLength: number;
    useTimer: boolean;
    timerDelay: number;
}

interface StorageInterfaceGroup {
    id: number;
    name: string;
    collapsed: boolean;
    published: boolean | string;
}

interface StorageInterfacePair {
    id: number;
    gid: number;
    en: string;
    ru: string;
    pd: number;
    marked: boolean;
}

interface StorageInterface {
    settings?: StorageInterfaceSettings;
    groups?: Array<StorageInterfaceGroup>;
    pairs?: Array<StorageInterfacePair>;
}

interface ActionInterfaceSettings {
    useTimer: boolean;
    timerDelay: number;
    avoidDoubles: boolean;
};

interface ActionInterface {
    type: string;
    pairId?: number;
    groupId?: number;
    name?: string;
    settings?: ActionInterfaceSettings;
    direction?: number;
    en?: string;
    ru?: string;
    link?: string;
    pairs?: Array<any>;
}

export default StorageInterface;

export {
    StorageInterface,
    ActionInterface,
    StorageInterfaceSettings,
    StorageInterfacePair,
    StorageInterfaceGroup
}
