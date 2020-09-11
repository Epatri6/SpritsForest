import React from 'react';

export default React.createContext({
    gameBoard: {},
    selectedMechanic: {},
    gameEval: {},
    setSelectedMechanic: () => {},
    placeMechanic: () => {},
    evaluateBoard: () => {},
    resetBoard: () => {},
    loadLevel: () => {},
    saveLevel: () => {}
});