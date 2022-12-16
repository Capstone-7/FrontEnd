import "./App.css";
import SetUpRouters from "./routers/SetUpRouters";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <SetUpRouters />
    </ThemeProvider>
  );
}

export default App;
