import React from 'react';
import { Link } from 'react-router';

const TeamCard = (props) => {
  return(
    <div className='team-card'>
      {props.team}
    </div>
  )
}

export default TeamCard;
