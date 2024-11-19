import React from "react";
import PlaylistItem from "./PlaylistItem";
import {ListBox} from "primereact/listbox";
import {ProgressSpinner} from "primereact/progressspinner";
import ReactPlayer from "react-player";

const Player = ({ video, loading, player, volume, onBuffer, onBufferEnd, onProgress }) => {
    return (
        <div className={'player'} style={{ background: 'black' }}>
            {!video &&
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p style={{
                        fontSize: '1.5em',
                        marginRight: '-40px',
                        cursor: 'default',
                        userSelect: 'none'
                    }}>
                        Select a video.
                    </p>
                </div>}
            {video && loading &&
                <ProgressSpinner
                    style={{
                        position: 'absolute',
                        left: '49%',
                        top: '46.5%',
                        WebkitTransform: 'translate(-50%, -50%)',
                        transform: 'translate(-50%, -50%)'
                    }}/>}
            {video &&
                <ReactPlayer
                    ref={player}
                    url={video && video.url}
                    volume={volume}
                    loop={true}
                    width='100%'
                    height='100%'
                    playing={true}
                    progressInterval={1}
                    onBuffer={onBuffer}
                    onBufferEnd={onBufferEnd}
                    onProgress={onProgress}
                />}
        </div>
    );
}

export default Player;