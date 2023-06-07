import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
