import React from 'react';
/**
 * The click-and-drag GUI for placing grid-altering mechanics
 */
export default class PlaceableMechanic extends React.Component {

    handleClick = (event) => {
        event.preventDefault();
    }

    constructor(props) {
        super(props);
        this.state = {
            uses: props.uses
        }
    }

    render() {
        return (
            ''
        );
    };

    static defaultProps = {
        uses: 0,
        type: ''
    }
}