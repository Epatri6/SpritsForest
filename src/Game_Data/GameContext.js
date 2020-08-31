import React from 'react';

export default React.createContext({
    time: 0,
    fps: 30,
    gameBoard: {},
    selectedMechanic: {},
    setSelectedMechanic: () => {},
    placeMehanic: () => {}
});