/* eslint-disable react/prop-types */

import React from 'react';
import ReactDOM from 'react-dom';

// https://github.com/facebook/react/issues/11098#issuecomment-412682721
export default function expectRenderError(element, expectedError) {

  class TestBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { didError: false };
    }
    componentDidCatch() {
      this.setState({ didError: true });
    }
    render() {
      const { children } = this.props;
      const { didError } = this.state;
      return didError ? null : children;
    }
  }

  const topLevelErrors = [];
  function handleTopLevelError(event) {
    topLevelErrors.push(event.error);
    event.preventDefault();
  }

  const div = document.createElement('div');
  window.addEventListener('error', handleTopLevelError);
  try {
    ReactDOM.render(
      <TestBoundary>
        {element}
      </TestBoundary>,
      div
    );
  }
  finally {
    window.removeEventListener('error', handleTopLevelError);
  }

  expect(topLevelErrors).toHaveLength(1);
  expect(topLevelErrors[0].message).toContain(expectedError);
}
