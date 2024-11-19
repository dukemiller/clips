import {Badge} from "primereact/badge";
import React from "react";

export const TagSelectButton = ({ name, count }) => {
    let coloring = name === "Untagged" ? "rgba(211,211,211,0.7)" : "white";
    let text = name === "Untagged" ? "(untagged)" : name
    const tagName = <span style={{ color: coloring }}>{text}</span>;

    return (
        <div>{tagName} <Badge value={count} severity={'contrast'}/></div>
    );
}
