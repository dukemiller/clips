import React from "react";

export const FavoriteButton = ({ onClick, value, disabled }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: 'auto' }}>
                <span style={{
                    opacity: 0.4, cursor: "default", userSelect: "none", marginRight: "5px"
                }}>Favorite</span>
                <button onClick={onClick} disabled={disabled}>
                    <i className={value ? "pi pi-star-fill" : "pi pi-star"} style={{ 'fontSize': '1.5em' }}/>
                </button>
            </div>
        </div>
    )
}
