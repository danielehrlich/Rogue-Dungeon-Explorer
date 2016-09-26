
export const PLAYER = {
	baseHealth: 100,
	health: 20,
	attack: 12,
	toNextLevel: 60
};

// Enemy values are increased for every dungeon level
export const ENEMY = {
	health: 20,
	attack: 12,
	xp: 10
};

export const ATTACK_VARIANCE = 7;

export const tileStyle = {
    WALL: 0,
    FLOOR: 1
};

export const reverseLookup = ['WALL', 'FLOOR'];

export const weaponItems = [
    {
        entityName: 'brass knuckles',
        entityType: 'weapon',
        health: 0,
        attack: 7
    },
    {
        entityName: 'serrated dagger',
        entityType: 'weapon',
        health: 0,
        attack: 12
    },
    {
        entityName: 'katana',
        entityType: 'weapon',
        health: 0,
        attack: 16
    },
    {
        entityName: 'reaper\'s scythe',
        entityType: 'weapon',
        health: 0,
        attack: 22
    },
    {
        entityName: 'large trout',
        entityType: 'weapon',
        health: 0,
        attack: 30
    }
];


export const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};


export {ATTACK_VARIANCE, tileStyle, reverseLookup, weaponItems, ENEMY, PLAYER, htmlEntities};

