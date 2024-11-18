import React from "react";

const ProgressBar = ({ onMouseDown, onChange, onMouseUp, onProgress, value }) => {
    return (
        <input
            type='range'
            style={{ width: '100%' }}
            min={0} max={0.999999}
            step='any'
            value={value}
            onMouseDown={onMouseDown}
            onChange={onChange}
            onMouseUp={onMouseUp}
            onProgress={onProgress}
        />
    );
}

export default ProgressBar;