import React from "react";

const ShareButton = ({ onClick, disabled }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: 'auto' }}>
                <span className='btn-info-text' style={{ marginRight: '5px' }}>Share</span>
                <button onClick={onClick} disabled={disabled}>
                    <i className='pi pi-share-alt' style={{ fontSize: '1.5em' }}/>
                </button>
            </div>
        </div>
    );
}

export default ShareButton;