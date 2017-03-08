import React, { Component } from 'react';
import { connect } from 'react-redux';
import PickEm from './pickem';
import { bindActionCreators } from 'redux';
import { getGameData } from '../actions/index';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getGameData();
  }

  render() {
    if ((!this.props.data) && (!this.props.user)) {
      return null;
    }
    
    return(
      <div>
        <div>
          <ul style={{display: 'flex', flexDirection: 'row', listStyle: 'none'}}>
            {
              this.props.data.map(function(game) {
                return(
                  <li style={{padding: 10}} key={Math.random()}> <img style={{width: 50, height: 50}} src={`../../assets/${game.homeTeam}.png`}/> {game.gameTime} <img src={`../../assets/${game.awayTeam}.png`} style={{width: 50, height: 50}} /> </li>
                )
              }, this)
            }
          </ul>
        </div>
        <div>
          SCORE: {this.props.user.wins} - {this.props.user.losses}
        </div>
        <div>
          TODAY'S PICK EM'
        </div>
        <div>
          Remember this choice cannot be changed. Pick it once and live with it
        </div>
        <div>
          <PickEm />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGameData }, dispatch);
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, data: state.gameData.data, user: state.auth.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);