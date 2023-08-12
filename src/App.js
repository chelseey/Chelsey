import React from 'react';
import CodeBackground from './components/codeBackground';
import ScrollingContainer from './components/scrollingContainer';
import './App.css'; 

function App() {

  const contentForPage1 = [
    'Page 1 Content Block 1',
    'Page 1 Content Block 2',
    'Page 1 Content Block 3',
    // ... add as many content blocks as you want
  ];

  return (
      <div className="App">
          <CodeBackground pathToFile="/path/to/your/codefile.js" />
          <ScrollingContainer contentBlocks={contentForPage1} />
      </div>
  );
}


export default App;

