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
        <span className='champ-name'
              style={{ backgroundColor: champion.color }}>
          {champion.name}
        </span>

        {/* <img className='chicken-dinner'
             src={require('../../images/chicken_dinner.png')} /> */}

        <div className='social-container'>
          <h3>Rub it in!</h3>
          <div className='social-icons'>
            <img src={require('../../images/facebook_icon.png')}/>
            <img src={require('../../images/twitter_icon.png')}/>
            <img src={require('../../images/instagram_icon.png')}/>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TournamentContainer(Champion);
