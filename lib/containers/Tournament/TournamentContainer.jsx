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
    teams: state.tournament.teams || [],
    name: state.tournament.name,
    qty: state.tournament.qty,
    code: state.tournament.code,
    tournament: state.tournament
    // shuffleTeams: result of business logic
  }
}

export default connect(mapStateToProps, mapDispatchToProps);
