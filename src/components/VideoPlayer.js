import 'primeicons/primeicons.css';
import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Toast} from 'primereact/toast';
import {useFavoritePages} from './FavoritesContextProvider';
import FavoriteButton from "./FavoriteButton";
import SortByButton from "./SortByButton";
import VolumeBar from "./VolumeBar";
import ShareButton from "./ShareButton";
import ProgressBar from "./ProgressBar";
import Playlist from "./Playlist";
import Player from "./Player";
import Title from "./Title";
import TagSelector from "./TagSelector";

let globalSortBy = "file"
let globalVolume = 0.6

export const VideoPlayer = ({ title, videos }) => {
    const toast = useRef(null);
    const { favoritePages, setFavoritePages } = useFavoritePages();
    const [video, setVideo] = useState(null);
    const [tag, setTag] = useState('Untagged');
    const [sortBy, setSortBy] = useState(globalSortBy);
    const [loading, setLoading] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const [played, setPlayed] = useState(0.0);
    const [volume, setVolume] = useState(globalVolume);
    const player = useRef(null);

    const tags = Object.entries(videos)
        .map(([key, value]) => ({
            name: key,
            count: value.length
        }))
        .sort((a, b) => {
            if (a.name === "Untagged") return -1;
            if (b.name === "Untagged") return 1;
            return a.name.localeCompare(b.name);
        });

    const taggedVideos = videos[tag]
        .sort((a, b) => {
            if (sortBy === 'file') {
                return a.file.localeCompare(b.file);
            } else if (sortBy === 'date') {
                return new Date(b.date) - new Date(a.date);
            }
            return 0;
        })
        .map(v => {
            v.file = v.file.replace(`[${tag}] `, '');
            v.favorite = favoritePages.includes(`${title}.${tag}.${v.file}`)
            return v;
        })

    const handleSeekMouseDown = () => setSeeking(true);

    const handleSeekChange = (e) => setPlayed(parseFloat(e.target.value));

    const handleSeekMouseUp = (e) => {
        setSeeking(false)
        player.current.seekTo(e.target.value);
    };

    const handleProgress = ({ played }) => {
        if (!seeking)
            setPlayed(played);
    };

    const handleOnBuffer = () => setLoading(true);

    const handleOnBufferEnd = () => {
        if (loading)
            setLoading(false);
    };

    const handleVolumeChange = ({ target: { value } }) => {
        setVolume(parseFloat(value))
        globalVolume = parseFloat(value);
    }

    const handleChangeSelectedVideo = ({ value }) => {
        setPlayed(0.0);
        setVideo(value);
        setLoading(true);
    }

    const handleShareClick = async () => {
        if (video !== null) {
            await navigator.clipboard.writeText(encodeURI(video.url));
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Clip URL copied to clipboard.',
                life: 2000
            });
        }
    }

    const handleSortClick = () => {
        setSortBy((prev) => {
            let value = prev === 'file' ? 'date' : 'file';
            globalSortBy = value;
            return value;
        })
    };

    const handleToggleFavorite = () => {
        const key = `${title}.${tag}.${video.file}`;
        if (favoritePages.includes(key)) {
            setFavoritePages(favoritePages.filter(f => f !== key))
        } else {
            setFavoritePages([...favoritePages, key])
        }
    }

    const disabled = video == null

    const videoIsFavorited = useMemo(() => !disabled && favoritePages.includes(`${title}.${tag}.${video.file}`), [favoritePages, video])

    return (
        <div>
            <Toast ref={toast} position="bottom-right"/>

            <div className='row row--no-gutters'>
                <Title text={title}/>
            </div>

            <div className='row'>
                <div className='col col--8 col--offset-1'>
                    <Player
                        video={video}
                        volume={volume}
                        player={player}
                        onBuffer={handleOnBuffer}
                        onBufferEnd={handleOnBufferEnd}
                        onProgress={handleProgress}
                        loading={loading}
                    />
                </div>

                <div className='col col--2'>
                    <Playlist
                        value={video}
                        values={taggedVideos}
                        onChange={handleChangeSelectedVideo}
                    />
                    <SortByButton
                        onClick={handleSortClick}
                        value={sortBy}/>
                </div>
            </div>

            <div className='row'>
                <div className='progressbar col col--8 col--offset-1'>
                    <ProgressBar
                        onChange={handleSeekChange}
                        onProgress={handleProgress}
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        value={played}
                    />
                </div>
            </div>

            <div className='row'>
                <div className='volumebar col col--1 col--offset-8'>
                    <VolumeBar
                        value={volume}
                        onChange={handleVolumeChange}/>
                </div>
                <div className='col col--2' >
                    <ShareButton
                        disabled={disabled}
                        onClick={handleShareClick}/>
                    <FavoriteButton
                        value={videoIsFavorited}
                        onClick={handleToggleFavorite}
                        disabled={disabled}
                    />
                </div>
            </div>

            <div className='row'>
                <div className="tagselector col col--7 col--offset-1">
                    <TagSelector
                        setValue={setTag}
                        value={tag}
                        values={tags}
                    />
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer;