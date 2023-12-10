import "./App.css";
import Header from "./Pages/Header";
import Main from "./Pages/Main";
import axios from "axios";

function App() {
  axios.defaults.headers.common = {
    "X-API-Key": "TGg8N9M6d4TLb8ghNqFHG8fDtB4LGHtq",
  };
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
