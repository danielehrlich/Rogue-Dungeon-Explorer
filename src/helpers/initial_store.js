export const initialStore = {

    // entities is an map of ids to object describing the entity
    entities: {
        'player': {
            attack: 7,
            entityType: 'player',
            health: 100,
            inventory: {},
            level: 0,
            toNextLevel: 60,
            weapon: 'stick',
            x: 0,
            y: 0
        }
    },
    // Link occupied space with entity id
    occupiedSpaces: {
        '0x0': 'player'
    },
    darkness: true,
    level: 0,
    map: [],
    windowHeight: 500,
    windowWidth: 500


};
