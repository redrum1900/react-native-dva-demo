import React from 'react';
import { create } from 'dva-core';
import { Provider, connect } from 'react-redux';
import createLoading from 'dva-loading';

export { connect };
export default options => {
  const app = create(options);
  app.use(createLoading());
  if (!global.registered) {
    options.models.forEach(model => app.model(model));
  }

  global.registered = true;

  app.start();

  const store = app._store;

  app.start = container => () => {
    return (
      <Provider store={store}>
        {container}
      </Provider>
    );
  };

  app.getStore = () => store;
  return app;
};
