// ACTIONS
export const INCREASE_LEVEL = 'INCREASE_LEVEL';

export function damage(entity, value) {
    return {
      type: 'DAMAGE',
      entityName: entity,
      value: value
    };
}

export function heal(entity, health) {
    return {
      type: 'HEAL',
      entityName: entity,
      value: health
    };
}

export function move(entity, vector) {
  console.log("move actioncreator ran!")
    return {
      type: 'MOVE',
      entityName: entity,
      vector: vector};
}

export function setLocation(entity, location) {
  console.log("setLocation actionCreaetor ran");
    return {
      type: 'SET_LOCATION',
      entityName: entity,
      location: location
    };
}

export function switchWeapon(weaponName, attack) {
    return {
      type: 'SWITCH_WEAPON',
      weapon: weaponName,
      attack: attack
    };
}

export function addEntity(entityName, entityType, health, attack, location) {
  console.log("I was ran addEntity!");
    return {
      type: 'ADD_ENTITY',
      entityName: entityName,
      entityType: entityType,
      health: health,
      attack: attack,
      location: location
    };
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

export function setMap(map) {
    return {
      type: 'SET_MAP',
      map: map
    };
}

export function increaseLevel() {
    return {
      type: 'INCREASE_LEVEL'
    };
}

export function resetLevel() {
    return {
      type: 'RESET_LEVEL'
    };
}

export function setWindowSize() {
    return {
      type: 'SET_WINDOW_SIZE',
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
}

export function gainXp(xp) {
    return {
      type: 'GAIN_XP',
      xp: xp
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

export function resetMap(map) {
    return {
      type: 'RESET_MAP',
      map: map};
}

export function addBoss(attack, health, coords) {
    return {
      type: 'ADD_BOSS',
      attack: attack,
      health: health,
      location: coords
    };
}

export function toggleDarkness() {
    return {
      type: 'TOGGLE_DARKNESS'
    };
}