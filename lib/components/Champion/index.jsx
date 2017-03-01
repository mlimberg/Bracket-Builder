import './champion-styles';
import '../../styles';
import React from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament';

const Champion = (props) => {
  const { name, champion } = props.tournament

  return(
    <div>
      <h1 className='page-header'>{name}</h1>

      <section className='sub-header-section'>
        <h1 className='winner-h1'>Winner Winner Chicken Dinner!</h1>
        <h3 className='winner-h3'>The grand champion is:</h3>
        <h1 className='champ-name'>{champion.name}</h1>
      </section>
    </div>
  )
}

export default TournamentContainer(Champion);
