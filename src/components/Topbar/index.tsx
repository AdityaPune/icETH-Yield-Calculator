import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./topbar.scss";
import IndexCoopIcon from "./icons/IndexCoopIcon";
import ICLogo from "./icons/ICLogo.png";
import { Grid, Box } from "@material-ui/core";

function Topbar() {
    return (
        <div className="appbar">
            <div className="appbar-logo">
                <img src={ICLogo} className="appbar-logo-img" />
            </div>
            <div className="appbar-links">
                <div className="appbar-links-item">Products</div>
                <div className="appbar-links-item">Resources</div>
                <div className="appbar-links-item">Community</div>
                <div className="appbar-links-item-special">APP</div>
            </div>
        </div>
    );
}

export default Topbar;
