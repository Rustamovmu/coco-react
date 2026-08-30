import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

test('renders the home screen', () => {
  const container = document.createElement('div');
  const root = createRoot(container);

  act(() => {
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  expect(container).toHaveTextContent('HOME');

  act(() => root.unmount());
});
