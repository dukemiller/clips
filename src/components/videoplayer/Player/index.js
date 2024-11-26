import React from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import ReactPlayer from "react-player";
import styles from './styles.module.css';

export const Player = ({
                         video,
                         loading,
                         paused,
                         onClick,
                         player,
                         volume,
                         onBuffer,
                         onBufferEnd,
                         onProgress
                       }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {!video && <p className={styles.unloaded}>Select a video.</p>}
      {video && loading && <ProgressSpinner className={styles.spinner}/>}
      {video &&
        <ReactPlayer
          ref={player}
          url={video && video.url}
          volume={volume}
          loop={true}
          width='100%'
          height='100%'
          playing={!paused}
          progressInterval={1}
          onBuffer={onBuffer}
          onBufferEnd={onBufferEnd}
          onProgress={onProgress}
        />}
    </div>
  );
}
