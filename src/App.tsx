import React from 'react';
import Main from './components/Main/Main';
import './styles/app.scss';

import MyMetaTags from './Meta';

function App() {
  return (
    <div>
      <MyMetaTags/>
      <Main/>
    </div>
  );
}

export default App;
