import React from 'react';
import CodeBackground from './components/codeBackground';
import './App.css'; 

function App() {
  return (
      <div className="App">
        <CodeBackground pathToFile="/path/to/your/codefile.js" />
        <div className="App">
			    <BrowserRouter>
				    <Header />
				      <Routes>
			      		<Route path="/" element={<Home />} />
			      		<Route path="/About" element={<About />} />
			      		<Route path="/Projects" element={<Projects />} />
			      		<Route path="/Passions" element={<Passions />} />
			      		<Route path="/Contact" element={<Contact />} />
			      	</Routes>
			      	<Footer />
			      </BrowserRouter>
		    </div>
      </div>
  );
}


export default App;

