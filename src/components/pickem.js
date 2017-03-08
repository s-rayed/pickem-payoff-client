import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserDailyChoice } from '../actions/index';
import { bindActionCreators } from 'redux';

class PickEm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenTeam: this.props.user.dailyChoice
    }
  }

  onTeamChoose(chosenTeam) {
    const email = this.props.user.email;
    this.props.updateUserDailyChoice({ email: email, chosenTeam: chosenTeam });
    this.setState({ chosenTeam });
  }

  renderPickEms() {
    var teams = this.props.data;
    if (!this.state.chosenTeam) {
      for (var i = 0; i < teams.length; i++) {
        if (teams[i].pickEm) {
          return(
            <li style={{padding: 50, listStyle: 'none'}} key={Math.random()}> <img onClick={this.onTeamChoose.bind(this, teams[i].homeTeam)} style={{width: 40+'%', height: 40+'%'}} src={`../../assets/${teams[i].homeTeam}.png`}/>  {teams[i].gameTime} <img onClick={this.onTeamChoose.bind(this,teams[i].awayTeam)} style={{width: 40+'%', height: 40+'%'}} src={`../../assets/${teams[i].awayTeam}.png`} /> </li>
          )
        }
      }
    } else {
      return(
        <li style={{padding: 50, listStyle: 'none'}} key={Math.random()}> <img style={{width: 40+'%', height: 40+'%'}} src={`../../assets/${this.state.chosenTeam}.png`}/> </li>
      )      
    }
  }

  render() {
    return(
      <div>
        <ul>
          {this.renderPickEms()}
        </ul>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUserDailyChoice }, dispatch);
}

function mapStateToProps(state) {
  return { data: state.gameData.data, user: state.auth.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickEm);