import React,{Component}from 'react';
import Card from './CardsUI';

import img1 from '../assert/1.jpg';
import img2 from '../assert/2.jpg';
import img3 from '../assert/3.jpg';
import img4 from '../assert/4.jpg';
class Cards extends Component{
    render(){

        return(
            <div>
                 <h1>Student DashBoard</h1>
            <div className='container-fluid d-flex justify-content-center'>
               
               <div className='row'>
                   <div className='col-md-5'>
                       <Card imgsrc={img1} title="Fluid Reasoning" path="/G1"/>
                   </div>
                   <div className='col-md-5'>
                       <Card imgsrc={img2} title="Quantatitive Reasoning" path="/G2"/>
                   </div>
                   <div className='col-md-5'>
                       <Card imgsrc={img3} title="Visual-Spatial Processing" path="/G3"/>
                       
                   </div>
                   <div className='col-md-5'>
                       <Card imgsrc={img4} title="Working Memory" path="/G4"/>
                   </div>
                </div>
            </div> 
            </div>
        );
    }
}
export default Cards;