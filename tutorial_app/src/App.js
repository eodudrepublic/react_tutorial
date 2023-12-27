import logo from './logo.svg';
import './App.css'; // App  UI 디자인

function App() {
  return (
    <div className="App">
      <h3>Hello World!</h3> {/* 중앙정렬되는 이유 : App.css -> text-align: center; */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
