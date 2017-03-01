import React from 'react';
import { Link } from 'react-router';

const TeamCard = (props) => {
  return(
    <div className={props.addClass} style={props.style}>
      {props.team}
    </div>
  )
}

export default TeamCard;
