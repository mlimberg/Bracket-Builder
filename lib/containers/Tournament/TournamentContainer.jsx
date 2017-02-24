import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

const mapStateToProps = (state) => {
  //put business logic HERE

  return {
    teams: state.currentTournament.teams || [],
    name: state.currentTournament.name,
    qty: state.currentTournament.qty,
    code: state.currentTournament.code,
    tournament: state.currentTournament
    // shuffleTeams: result of business logic
  }
}

export default connect(mapStateToProps, mapDispatchToProps);
