import "@material-ui/core/styles";
import "@material-ui/icons";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";

const App = () => (
  <ThemeProvider theme={theme}>
    {/* your app components here */}
  </ThemeProvider>
);