import React from "react";

export const FavoriteButton = ({ onClick, value, disabled }) => {

    const favoriteIcon = value ? "pi pi-star-fill" : "pi pi-star"

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: 'auto' }}>
                <span className='btn-info-text' style={{ marginRight: '5px' }}>Favorite</span>
                <button onClick={onClick} disabled={disabled}>
                    <i className={favoriteIcon} style={{ 'fontSize': '1.5em' }}></i>
                </button>
            </div>
        </div>
    )
}


export default FavoriteButton;