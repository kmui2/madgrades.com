import React from 'react';
import {Button, Container, Divider, Icon} from 'semantic-ui-react';
import GpaCalculator from '../components/GpaCalculator';

const Calculator = () => {
  document.title = 'Calculator - Madgrades';

  return (
    <div className='Calculator'>
      <Container text>
        <p></p>
        <br/>
        <Divider horizontal>Calculator</Divider>
        <GpaCalculator/>
      </Container>
    </div>
  );
};
export default Calculator;