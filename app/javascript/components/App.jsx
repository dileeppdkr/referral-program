import { BrowserView, MobileView } from "react-device-detect";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const App = () => (
  <>
    <MobileView>
      <MobileNavbar />
    </MobileView>
    <BrowserView>
      <DesktopNavbar />
    </BrowserView>
    {/* other app components */}
  </>
);

// import React from "react";
// import Routes from "../routes";

// export default props => <>{Routes}</>;