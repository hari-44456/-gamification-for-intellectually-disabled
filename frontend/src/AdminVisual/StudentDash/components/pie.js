import {Pie} from 'react-chartjs-2';
import React,{Component} from 'react'
import { BrowserRouter, Link} from 'react-router-dom'
import {Button} from '@material-ui/core';
class PieChartComponents extends Component{

    constructor(props){
        super(props)
        this.state={
            labels:['G1','G2','G3','G4'],
            datasets:[{
                    
                data:[40,50,60,70],
                backgroundColor:['red','blue','green','orange']
            }]
        }
    }

render (){
    return (

        <div>
            <h1>Pie charts for game analysis</h1>
            <Pie 
            data={{
                labels:this.state.labels,
                datasets:this.state.datasets
            }}
            height='80%'
            />
            <br/>
            <h1>ML Model For Anlysis</h1>
            <Button variant='outlined'>
                <BrowserRouter>
                    <Link to="/model" >ML Model for prediction</Link>
                </BrowserRouter>
           </Button>
        </div>
    )
   }
}
export default PieChartComponents;