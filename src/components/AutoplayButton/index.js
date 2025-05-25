import React from "react";
import { Button } from 'primereact/button';

export const AutoplayButton = ({ value, onClick }) => {
  const icon = "pi " + (value ? "pi-circle-on" : "pi-circle-off")

  return (
    <Button
      size="small"
      icon={icon}
      iconPos="right"
      style={{float: 'left', background: 'inherit', paddingLeft: '0px'}}
      onClick={onClick}
      label="Autoplay"
      text
    />
  );
}
