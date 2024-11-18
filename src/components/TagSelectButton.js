import {Badge} from "primereact/badge";
import React from "react";

const TagSelectButton = ({ name, count }) => {
    let coloring = name === "Untagged" ? "rgba(211,211,211,0.7)" : "white";
    let text = name === "Untagged" ? "(untagged)" : name
    return (
        <div><span style={{ color: coloring }}>{text}</span> <Badge value={count} severity={'contrast'}/></div>
    );
}

export default TagSelectButton