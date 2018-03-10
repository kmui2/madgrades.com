import React, {Component} from "react";
import {connect} from "react-redux";
import utils from "../utils";
import PropTypes from "prop-types"
import {Dropdown, Form, Grid} from "semantic-ui-react";
import TermSelect from "../containers/TermSelect";
import CourseChart from "./CourseChart";

class CourseChartViewer extends Component {
  static propTypes = {
    uuid: PropTypes.string.isRequired,
    termCode: PropTypes.number,
    instructorId: PropTypes.number,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: ({termCode, instructorId}) => {}
  };

  componentWillMount = () => {
    const { uuid, actions } = this.props;
    actions.fetchCourseGrades(uuid);
  };

  componentDidUpdate = this.componentWillMount;

  onTermCodeChange = (termCode) => {
    const { onChange, instructorId } = this.props;

    this.setState({
      termCode
    }, () => {
      onChange({termCode, instructorId})
    });
  };

  onInstructorChange = (event, { value }) => {
    const { onChange, termCode } = this.props;

    this.setState({
      instructorId: value
    }, () => {
      onChange({termCode, instructorId: value})
    });
  };

  render = () => {
    const { uuid, data, instructorId, termCode } = this.props;

    let instructorOptions = [],
        termCodes = [],
        termDescs = {},
        instructorText = 'All instructors',
        termText = 'All semesters';

    if (data && !data.isFetching) {
      instructorOptions.push({
        key: 0,
        value: 0,
        text: instructorText
      });
      instructorOptions = instructorOptions.concat(data.instructors.map(i => {
        return {
          key: i.id,
          value: i.id,
          text: i.name,
          description: utils.grades.gpa(i.cumulative).toFixed(2)
        }
      }));

      data.courseOfferings.forEach(o => {
        termCodes.push(o.termCode);
        termDescs[o.termCode] = utils.grades.gpa(o.cumulative).toFixed(2);
      });

      // if instructor selected, filter term codes
      if (instructorId) {
        let instructorName = 'N/A';

        termCodes = termCodes.filter(code => {
          if (code === 0)
            return true;

          const instructor = data.instructors.filter(i => i.id === instructorId)[0];

          if (!instructor)
            return true;

          instructorName = instructor.name;
          return instructor.terms.map(term => term.termCode).includes(code);
        });

        termText += ` (${instructorName})`;
      }

      // if term code selected, filter instructor options
      if (termCode) {
        let termName = utils.termCodes.toName(termCode);
        instructorText += ` (${termName})`;

        instructorOptions = instructorOptions.filter(option => {
          const id = option.value;

          if (id === 0)
            return true;

          const instructor = data.instructors.filter(i => i.id === id)[0];
          return instructor.terms.map(term => term.termCode).includes(termCode);
        });
      }

      instructorOptions[0].text = instructorText;
    }

    let instructorChosen = instructorId || undefined,
        termChosen = termCode || undefined;

    return (
        <Grid>
          <Grid.Column width={4} mobile={16} tablet={16} computer={4}>
            <Form>
              <Form.Field>
                <label>Instructors</label>
                <Dropdown
                    fluid
                    selection
                    search
                    options={instructorOptions}
                    onChange={this.onInstructorChange}
                    value={instructorId}/>
              </Form.Field>
              <Form.Field>
                <label>Semesters</label>
                <TermSelect
                    value={termCode}
                    termCodes={termCodes}
                    includeCumulative={true}
                    cumulativeText={termText}
                    onChange={this.onTermCodeChange}
                    descriptions={termDescs}/>
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width={12} mobile={16} tablet={16} computer={12}>
            <CourseChart uuid={uuid} instructorId={instructorChosen} termCode={termChosen}/>
          </Grid.Column>
        </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const data = state.grades.courses.data[ownProps.uuid];

  return {
    data
  };
}


export default connect(mapStateToProps, utils.mapDispatchToProps)(CourseChartViewer)