import React from "react";

const VolumeBar = ({ value, onChange }) => {
    return (
        <input type='range'
               min={0} max={1} step='any'
               style={{ width: '100%' }}
               value={value}
               onChange={onChange}/>
    );
}

export default VolumeBar;