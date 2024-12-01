import {Tag} from "primereact/tag";
import React from "react";

export const HoverBadge = ({ value, isVisible }) => {
  return (
    <div style={{
      marginLeft: 'auto',
      float: 'right',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Tag
        value={value}
        style={{
          display: "inline-block",
          color: '#9FA8DA',
          backgroundColor: '#121212',
          visibility: isVisible ? "visible" : "hidden"
        }}
      />
    </div>
  );
};