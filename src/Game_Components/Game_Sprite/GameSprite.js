import React from 'react';

export default class GameSprite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      tick: '',
    };
  }

  //Start tracking time
  componentDidMount = () => {
    this.setState({ tick: this.tick() });
  };

  //Avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.state.tick);
  };

  //Update state, then wait again
  tick = () => {
    if(this.props.fps <= 0) {
      return;
    }
    return setTimeout(this.update, 1000 / this.props.fps);
  };

  //update time
  update = () => {
    const { time } = this.state;
    const { fps } = this.props;
    if(fps <= 0) {
        return;
    }
    this.setState({
      time: time + (1 / fps),
      tick: this.tick(),
    });
  };

  renderSprite = () => {
    const { time } = this.state;
    const { fps, sprites } = this.props;
    return (
      <img src={sprites[Math.floor((fps * time) % sprites.length)]} alt="" />
    );
  };

  render = () => {
    return <>{this.props.sprites.length > 0 && this.renderSprite()}</>;
  };

  static defaultProps = {
    fps: 0,
    sprites: [],
  };
}
