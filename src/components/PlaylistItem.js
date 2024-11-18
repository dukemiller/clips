import React from "react";

const PlaylistItem = (video) => {
    return (
        <div>
            <div>{video.favorite && <i className='pi pi-star-fill'
                                       style={{ color: 'gold', fontSize: '1em' }}>&nbsp;</i>}{video.file}</div>
        </div>
    );
}

export default PlaylistItem