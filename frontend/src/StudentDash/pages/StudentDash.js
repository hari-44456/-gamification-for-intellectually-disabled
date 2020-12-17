import React,{useState,useEffect,useContext} from 'react';
import {Row,Col} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import StudentInfo from '../components/StudentInfo';
import GraphReport from '../components/GraphReport';
import DisplayScores from '../components/DisplayScores'
import axios from '../../axios';
import { TokenContext } from '../../context/TokenContext';
import Loader from '../../utils/Loader'


const useStyles = makeStyles((theme) => ({
    info: {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
    },
}));

const createData = (g1, g2, g3, g4, date) => ({ g1, g2, g3, g4, date })

const getRows = (res) => {
    const compare = (a, b) => a.date < b.date;
    res.data.scores.sort(compare);
    let scores = [];
    for (let i = 0; i < 15 && i < res.data.scores.length; i++)
        scores.push({ g1: res.data.scores[i].g1, g2: res.data.scores[i].g2, g3: res.data.scores[i].g3, g4: res.data.scores[i].g4 ,date:res.data.scores[i].date })
    scores = scores.map(doc => createData(doc.g1, doc.g2, doc.g3, doc.g4, doc.date));
    return scores;
}

const getGraphData = (response) => {
    const tempDates = [], tempScores = [];
    var len = response.data.scores.length;
    for (var i = 0; i < len && i < 20; i++){
        let date = response.data.scores[i].date;
        let datearr = date.split('-');
        date = datearr[1]+'/'+datearr[2]+'/'+datearr[0];
        tempDates.push(date);
        tempScores.push((response.data.scores[i].g1+response.data.scores[i].g2+response.data.scores[i].g3+response.data.scores[i].g4)/4);
    }
    tempDates.push(0);
    tempScores.push(0);
    tempDates.reverse();
    tempScores.reverse();

    return {
        tempDates,
        tempScores
    }
}

export default function StudentDash(){
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [token] = useContext(TokenContext);
    const [rows, setRows] = useState([]);
    const [dates, setDates] = useState([]);
    const [scores, setScores] = useState([]);
    const [studentId,setStudentId]=useState(null);
    
    const headers = {
		'auth-token': token.tokenValue,
	};

    useEffect(() => {
        axios.get('/student/score', { headers })
            .then(res => {
                console.log(res)
                setStudentId(res.data.sid);
                setRows(getRows(res))
                const graphData = getGraphData(res);
                setDates(graphData.tempDates);
                setScores(graphData.tempScores);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if(loading){
		return <Loader />;
	}

    return(
        <React.Fragment>
            <Row>
                <Col md={5} className={classes.info}>
                    <Row>
                        <Col>
                            <StudentInfo studentId={studentId} />
                            <br /><br />
                            <h2>Student Scores</h2>
                            <DisplayScores rows={rows} />
                        </Col>
                    </Row>
                </Col>
                <Col md={7} align='left'>
                    <Row>
                        <Col>
                            <GraphReport labels={dates} scores={scores} />
                            <GraphReport labels={dates} scores={scores} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}