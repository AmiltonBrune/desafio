import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { Container } from './styles';

function TooltipComponent({ id, text, position }) {
  return (
    <Container>
      <Tooltip
        anchorId={id}
        content={text}
        events={['hover', 'click']}
        place={position}
      />
    </Container>
  );
}

export default TooltipComponent;
