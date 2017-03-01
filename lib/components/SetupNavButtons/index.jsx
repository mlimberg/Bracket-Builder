import React from 'react';
import { Link } from 'react-router';

const SetupNavButtons = (props) => {
  return (
    <div className={`setup-nav-buttons ${props.addClass}`}>
      <Link to={props.back}>
        <button className='btn back-btn'>{props.backText}</button>
      </Link>

      <Link to={props.next}>
        <button className='btn next-btn'
                onClick={props.handleNextClick}>
          {props.nextText}
        </button>
      </Link>
    </div>
  )
}

export default SetupNavButtons;
