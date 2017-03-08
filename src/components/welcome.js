import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGameData } from '../actions/index';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getGameData();
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    return (
      <div>
        <ul style={{display: 'flex', flexDirection: 'row', listStyle: 'none'}}>
          {
            this.props.data.map(function(game) {
              return <li style={{padding: 10}} key={Math.random()}> <img style={{width: 50, height: 50}} src={`../../assets/${game.homeTeam}.png`}/> {game.gameTime} <img src={`../../assets/${game.awayTeam}.png`} style={{width: 50, height: 50}} /> </li>
            })
          }
        </ul>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGameData }, dispatch);
}

function mapStateToProps(state) {
  return { data: state.gameData.data }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);