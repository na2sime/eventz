import React, {JSX} from "react";
import "./Background.scss";
export default function Background(): JSX.Element {
    return (
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
    );
}