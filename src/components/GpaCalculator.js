import React, {Component} from 'react';
import {Input, Dropdown, Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import utils from '../utils';
import PropTypes from 'prop-types'

const gpaOptions = [
  'A',
  'AB',
  'B',
  'BC',
  'C',
  'D',
  'F',
  'Other'
].map(name => {
  return {
    key: name,
    text: name,
    value: name
  }
});

class CourseForm extends Component {
  render = () => {
    return (
      <div>
        <Input
            className='CourseName'
            placeholder='Course Name'
        />
        &nbsp;
        <Dropdown
            selection
            search
            placeholder='Grade'
            options={gpaOptions}/>
        &nbsp;
      </div>
    )
  }
}


class GpaCalculator extends Component {
  componentWillMount = () => {
    const { actions } = this.props;
  };

  render = () => {
    return (
      <div>
        <CourseForm/>
        <CourseForm/>
        <CourseForm/>
        <CourseForm/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}


export default connect(mapStateToProps, utils.mapDispatchToProps)(GpaCalculator)
