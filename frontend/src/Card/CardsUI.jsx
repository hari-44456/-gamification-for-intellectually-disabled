import React from 'react';

import './cards-style.css'
import { Link } from 'react-router-dom';

const Card=props=>{
    return (
    <div className='card text-center'>
        <div className='overflow' >
            <img src={props.imgsrc} alt="Image1" className='card-img-top'/>
         </div>
         <div className="card-body text-dark">
         <h4 className='card-title'>{props.title}</h4>
            <p className='card-text text-secondary'>Game that tells about you</p>
        <button ><Link to={props.path}> Play</Link></button>
        </div>

    </div>);
 };
export default Card;