import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

const mapStateToProps = ({ currentTournament }) => {
  return {
    tournament: currentTournament
  }
}

export default connect(mapStateToProps, mapDispatchToProps);
