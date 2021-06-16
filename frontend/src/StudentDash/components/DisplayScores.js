import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const SERVER_URL = 'http://127.0.0.1:5000/'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



/* class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        sepalLength: 4,
        sepalWidth: 2,
        petalLength: 1,
        petalWidth: 0
      },
      result: ""
    };
} */
export default function BasicTable({ rows }) {
    const classes = useStyles();
    /* const formData={
       sepalLength:0,
       sepalWidth:0,
       petalLength:0,
       petalWidth:0

    }
    function predict(g1,g2,g3,g4){

      formData={
        sepalLength: g1,
        sepalWidth: g2,
        petalLength: g3,
        petalWidth: g4
        }
        const result="";
      //this.setState({ isLoading: true });
      fetch(SERVER_URL, 
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(response => {
          ({
            result: response.result,
            //isLoading: false
          });
        });
        return result;
    } */
    var MaxG1=0;
    var MaxG2=0;
    var MaxG3=0;
    var MaxG4=0;
    function myFunction(g1,g2,g3,g4){
      const prev=50;
      //console.log("Score");
      //console.log(g1);
      //console.log(g2);
      //console.log(g3);
      //console.log(g4);
      MaxG1=Math.max(MaxG1,g1);
      MaxG2=Math.max(MaxG2,g2);
      MaxG3=Math.max(MaxG3,g3);
      MaxG4=Math.max(MaxG4,g4);
      const x=((g1+g2+g3+g4)/400)*100; 
      //console.log(x);
      if(x>=(50) && x<=60&& prev<=60){
        return "Not Improved  (Moderate)";
      } 
      if(x>=50 &&x>60&&prev>=50&&prev<=60){
          return "Improved (Moderate->Mild)";
      }
      if(x>=60 && prev>=60&& prev<=70){
          return "Not Improved Mild";
      }
      if(x>=70){
          return "Improved Gain good Skills";
      }
      return "Improved Try you will get it";
    }
    /* const g1=0;
    
    const g2=0;
    const g3=0;
    const g4=0;
    const result=0; */
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Dessert (100g serving)</TableCell> */}
            <TableCell align="left">G1</TableCell>
            <TableCell align="left">G2&nbsp;(g)</TableCell>
            <TableCell align="left">G3&nbsp;(g)</TableCell>
            <TableCell align="left">G4&nbsp;(g)</TableCell>
            <TableCell align="left">Date&nbsp;</TableCell>
            <TableCell align="left">Status&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              
              <TableCell align="left">{row.g1}</TableCell>
              <TableCell align="left">{row.g2}</TableCell>
              <TableCell align="left">{row.g3}</TableCell>
              <TableCell align="left">{row.g4}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              
            <TableCell align="left">{myFunction(row.g1,row.g2,row.g3,row.g3)}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
      <p>Final Score and Result:</p>
      <TableHead>
          <TableRow>
            {/* <TableCell>Dessert (100g serving)</TableCell> */}
            <TableCell align="left">G1</TableCell>
            <TableCell align="left">G2&nbsp;(g)</TableCell>
            <TableCell align="left">G3&nbsp;(g)</TableCell>
            <TableCell align="left">G4&nbsp;(g)</TableCell>
            <TableCell align="left">Date&nbsp;</TableCell>
            <TableCell align="left">Status&nbsp;</TableCell>
          </TableRow>
        </TableHead>
         <TableRow >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              
              <TableCell align="left">{MaxG1}</TableCell>
              <TableCell align="left">{MaxG2}</TableCell>
              <TableCell align="left">{MaxG3}</TableCell>
              <TableCell align="left">{MaxG4}</TableCell>
              <TableCell align="left"></TableCell>
              
            <TableCell align="left">{myFunction(MaxG1,MaxG2,MaxG3,MaxG4)}</TableCell>
            </TableRow>
    </TableContainer>
  );
}
