import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const SERVER_URL = 'http://127.0.0.1:5000/prediction/';

// these constants should be obtained from server
const MIN_SEPAL_LENGTH = 4,
      MAX_SEPAL_LENGTH = 7,
      MIN_SEPAL_WIDTH = 2,
      MAX_SEPAL_WIDTH = 4,
      MIN_PETAL_LENGTH = 1,
      MAX_PETAL_LENGTH = 6,
      MIN_PETAL_WIDTH = 0.1,
      MAX_PETAL_WIDTH = 3;

class App extends Component {

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
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  // add timeout
  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
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
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  buildOptions = (from, to) => {
    var items = []
    for (var i = 1; i <= 100; i = +(i + 1).toFixed(1)) {
      items.push(<option key = {i} value = {i}>{i}</option>);
    }
    return items;
  }

  getSepalLengths = () =>{
    return this.buildOptions(MIN_SEPAL_LENGTH, MAX_SEPAL_LENGTH);
  }

  getSepalWidths = () =>{
    return this.buildOptions(MIN_SEPAL_WIDTH, MAX_SEPAL_WIDTH);
  }

  getPetalLengths = () => {
    return this.buildOptions(MIN_PETAL_LENGTH, MAX_PETAL_LENGTH);
  }

  getPetalWidths = () => {
    return this.buildOptions(MIN_PETAL_WIDTH, MAX_PETAL_WIDTH);
  }

  renderSepalLength = () => {
    const sepalLength = this.state.formData.sepalLength;
    const sepalLengths = this.getSepalLengths();
    return  <Form.Group as={Col}>
                <Form.Label>G1-score</Form.Label>
                <Form.Control 
                  as="select"
                  value={sepalLength}
                  name="sepalLength"
                  onChange={this.handleChange}>
                  {sepalLengths}
                </Form.Control>
              </Form.Group>
  }

  renderSepalWidth = () => {
    const sepalWidth = this.state.formData.sepalWidth;
    const sepalWidths = this.getSepalWidths();
    return    <Form.Group as={Col}>
                <Form.Label>G2-score</Form.Label>
                <Form.Control 
                  as="select"
                  value={sepalWidth}
                  name="sepalWidth"
                  onChange={this.handleChange}>
                  {sepalWidths}
                </Form.Control>
              </Form.Group>
  }

  renderPetalLength = () => {
    const petalLength = this.state.formData.petalLength;
    const petalLengths = this.getPetalLengths();
    return  <Form.Group as={Col}>
                <Form.Label>G3-score</Form.Label>
                <Form.Control 
                  as="select"
                  value={petalLength}
                  name="petalLength"
                  onChange={this.handleChange}>
                  {petalLengths}
                </Form.Control>
              </Form.Group>
  }

  renderPetalWidth = () => {
    const petalWidth = this.state.formData.petalWidth;
    const petalWidths = this.getPetalWidths();
    return  <Form.Group as={Col}>
              <Form.Label>G4-score</Form.Label>
              <Form.Control 
                as="select"
                value={petalWidth}
                name="petalWidth"
                onChange={this.handleChange}>
                {petalWidths}
              </Form.Control>
            </Form.Group>
  }

  renderButtons = () => {
    const isLoading = this.state.isLoading;
    return <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  {isLoading ? 'Making prediction' : 'Predict'}
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
           </Row>
  }
  renderResults = () => {
    const result = this.state.result;
    return result === "" ? null :
          (<Row>
            <Col className="result-container">
              <h5 id="result">{result}</h5>
            </Col>
          </Row>)
      
  }
  render() {
    return (
      <Container>
        <div>
          <h1 className="title">Model for intellectual disability</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              {this.renderSepalLength()}
              {this.renderSepalWidth()}
            </Form.Row>
            <Form.Row>
              {this.renderPetalLength()}
              {this.renderPetalWidth()}
            </Form.Row>
            {this.renderButtons()}
          </Form>
          {this.renderResults()}
        </div>
      </Container>
    );
  }
}

export default App;