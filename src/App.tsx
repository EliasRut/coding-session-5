import React from 'react';
import logo from './logo.svg';
import { Header } from 'semantic-ui-react';
import './App.css';

export interface AppProps {
  headerText: string;
}

export const App: React.FunctionComponent<AppProps> = (props) => {  return (
    <div className="App">
      <Header>{props.headerText}</Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
