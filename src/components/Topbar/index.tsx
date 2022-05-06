import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./topbar.scss";
import IndexCoopIcon from "./icons/IndexCoopIcon";
import ICLogo from "./icons/ICLogo.png";
import { Link } from "@material-ui/core";

function Topbar() {
    return (
        <div className="appbar">
            <div className="appbar-logo">
                <img src={ICLogo} className="appbar-logo-img" />
            </div>
            <div className="appbar-links">
                <Link href="https://indexcoop.com/" target="_blank">
                    <div className="appbar-links-item">Products</div>
                </Link>
                <Link href="https://docs.indexcoop.com/" target="_blank">
                    {" "}
                    <div className="appbar-links-item">Resources</div>
                </Link>

                <Link href="https://gov.indexcoop.com/" target="blank">
                    {" "}
                    <div className="appbar-links-item">Forum</div>
                </Link>
                <Link href="https://app.indexcoop.com/" target="_blank">
                    {" "}
                    <div className="appbar-links-item-special">APP</div>
                </Link>
            </div>
        </div>
    );
}

export default Topbar;
