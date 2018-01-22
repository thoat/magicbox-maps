import React, {
  Component
} from 'react';
/* eslint-enable no-unused-vars*/
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'
import SliderChange from '../actions/action-slider-change';
import {
  Col,
  Row,
  Grid
} from 'react-bootstrap'
import Dock from 'react-dock';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {
  Pie
} from 'react-chartjs-2';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
const styles = {
  remove: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '10px',
    cursor: 'pointer'
  },
  general: {
    color: 'white'

  }
}
let options = {
  legend: {
    display: true,
    position: 'bottom',

  }
}


class Docker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internalDock: true
    }

  }
  handleChange(value) {
    this.props.sliderChange(this.props.activeCountry.points, value);
  }

  render() {
    let data = {
      labels: [
        'Above Threshold',
        'Below Threshold',
        'Zero Connectivity',
        'No Data'
      ],
      datasets: [{
        data: [
          this.props.sliderValues.aboveT,
          this.props.sliderValues.belowT,
          this.props.sliderValues.zeroT,
          this.props.sliderValues.nullT,
        ],
        backgroundColor: [
          '#5cb85c',
          '#F5A623',
          '#d9534f',
          '#6A1E74'

        ],
        hoverBackgroundColor: [
          '#5cb85c',
          '#F5A623',
          '#d9534f',
          '#6A1E74'
        ]
      }]
    };
    let showDocker = this.props.didUpdate && this.state.internalDock;
    return (
      <Dock
        isVisible={showDocker}
        dockStyle={{ background: 'rgba(0, 0, 0, 0.8)' }}
        position='bottom'
        dimMode='none'
        defaultSize = {0.38}
      >
        <div style={styles.general}>
          <div style={{'textAlign': 'center'}}>
            <h2>{this.props.activeCountry.selectedCountryName}</h2>
          </div>
          <Glyphicon glyph='remove'
            onClick={() => this.setState({ internalDock: false })}
            style={styles.remove} />
          <Grid>
            <Row className="show-grid">
              <Col md={4}>
                <h3> Information </h3>
                <h4> Number of Schools: {this.props.activeCountry.selectedCountryNumSchools}</h4>
                <h4> Average speed: {this.props.activeCountry.selectedCountryAvgMbps}</h4>
              </Col>
              <Col md={4}>
                <Pie data={data} options={options} />
              </Col>
              <Col md={4}>
                {/* <div className='slider'>
                  <Slider
                    min={0}
                    max={12}
                    step={0.5}
                    value={this.props.sliderValues.sliderVal}
                    onChange={this.handleChange.bind(this)}
                  />
                  <div className='value' style={{'textAlign': 'center'}}>
                    {this.props.sliderValues.sliderVal}</div>
                </div> */}

              </Col>
            </Row>
          </Grid>
        </div>
      </Dock>

    );
  }
}

/* eslint-disable require-jsdoc*/
function mapStateToProps(state) {
  return {
    activeCountry: state.activeCountry,
    sliderValues: state.sliderChanged
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    sliderChange: SliderChange,
  }, dispatch)
}

/* eslint-enablerequire-jsdoc*/
export default connect(mapStateToProps, matchDispatchToProps)(Docker);