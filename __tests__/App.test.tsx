/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('mounts the weather app', async () => {
  let renderedApp: ReturnType<typeof ReactTestRenderer.create> | undefined;
  await ReactTestRenderer.act(() => {
    renderedApp = ReactTestRenderer.create(<App />);
  });
  expect(renderedApp).toBeDefined();
});
