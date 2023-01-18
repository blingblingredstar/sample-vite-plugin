import DefaultLogo, { ReactComponent as Logo } from './assets/react.svg';
import './App.css';

function App() {
  console.log('logo', DefaultLogo);
  return (
    <div className="App">
      <Logo />
    </div>
  );
}

export default App;
