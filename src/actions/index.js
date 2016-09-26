export function addBoss(attack, health, coords) {
    return {
      type: 'ADD_BOSS',
      attack: attack,
      health: health,
      location: coords
    };
}

export function addEntity(entityName, entityType, health, attack, location) {
    return {
      type: 'ADD_ENTITY',
      entityName: entityName,
      entityType: entityType,
      health: health,
      attack: attack,
      location: location
    };
}

export function damage(entity, value) {
    return {
      type: 'DAMAGE',
      entityName: entity,
      value: value
    };
}

export function gainXp(xp) {
    return {
      type: 'GAIN_XP',
      xp: xp
    };
}

export function heal(entity, health) {
    return {
      type: 'HEAL',
      entityName: entity,
      value: health
    };
}

export function increaseLevel() {
    return {
      type: 'INCREASE_LEVEL'
    };
}

export function levelUp(attack, health, xp) {
    return {
      type: 'LEVEL_UP',
      attack: attack,
      health: health,
      toNextLevel: xp
    };
}

export function move(entity, direction) {
    return {
      type: 'MOVE',
      entityName: entity,
      direction: direction};
}

export function removeEntity(entityName) {
    return {
      type: 'REMOVE_ENTITY',
      entityName: entityName
    };
}

export function resetBoard() {
    return {
      type: 'RESET_BOARD'
    };
}

export function resetLevel() {
    return {
      type: 'RESET_LEVEL'
    };
}

export function resetMap(map) {
    return {
      type: 'RESET_MAP',
      map: map};
}

export function setLocation(entity, location) {
    return {
      type: 'SET_LOCATION',
      entityName: entity,
      location: location
    };
}

export function setMap(map) {
    return {
      type: 'SET_MAP',
      map: map
    };
}

export function setWindowSize() {
    return {
      type: 'SET_WINDOW_SIZE',
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
}

export function switchWeapon(weaponName, attack) {
    return {
      type: 'SWITCH_WEAPON',
      weapon: weaponName,
      attack: attack
    };
}

export function toggleDarkness() {
    return {
      type: 'TOGGLE_DARKNESS'
    };
}