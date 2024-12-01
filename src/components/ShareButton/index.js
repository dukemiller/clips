import React from "react";

export const ShareButton = ({ onClick, disabled }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: 'auto' }}>
                <span style={{
                    opacity: 0.4, cursor: "default", userSelect: "none", marginRight: "5px"
                }}>Share</span>
                <button onClick={onClick} disabled={disabled}>
                    <i className='pi pi-share-alt' style={{ fontSize: '1.5em' }}/>
                </button>
            </div>
        </div>
    );
}
