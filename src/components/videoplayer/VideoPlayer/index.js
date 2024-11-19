import 'primeicons/primeicons.css';
import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Toast} from 'primereact/toast';
import {useFavoritePages} from '../../context/FavoritesContextProvider';

import {FavoriteButton, ShareButton, SortByButton, TagSelectButtonGroup} from '../../buttons';
import {ProgressBar, VolumeBar} from '../../bars'
import {Playlist, Player, Title} from '..'

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

    const onMouseDown = () => setSeeking(true);

    const handleSeekChange = (e) => setPlayed(parseFloat(e.target.value));

    const onMouseUp = (e) => {
        setSeeking(false)
        player.current.seekTo(e.target.value);
    };

    const onProgress = ({ played }) => {
        if (!seeking)
            setPlayed(played);
    };

    const onBuffer = () => setLoading(true);

    const onBufferEnd = () => {
        if (loading)
            setLoading(false);
    };

    const onVolumeChange = ({ target: { value } }) => {
        setVolume(parseFloat(value))
        globalVolume = parseFloat(value);
    }

    const onVideoChange = ({ value }) => {
        setPlayed(0.0);
        setVideo(value);
        setLoading(true);
    }

    const onShareClick = async () => {
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

    const onSortClick = () => {
        setSortBy((prev) => {
            let value = prev === 'file' ? 'date' : 'file';
            globalSortBy = value;
            return value;
        })
    };

    const onFavoriteClick = () => {
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
                <div className='col col--8 col--offset-1'>
                    <Title text={title}/>
                </div>
            </div>

            <div className='row'>
                <div className='col col--8 col--offset-1'>
                    <Player video={video} volume={volume} player={player} loading={loading}
                            onBuffer={onBuffer} onBufferEnd={onBufferEnd} onProgress={onProgress}/>
                </div>
                <div className='col col--2'>
                    <Playlist value={video} values={taggedVideos} onChange={onVideoChange}/>
                    <SortByButton value={sortBy} onClick={onSortClick}/>
                </div>
            </div>

            <div className='row'>
                <div className='col col--8 col--offset-1'>
                    <ProgressBar value={played}
                                 onChange={handleSeekChange} onProgress={onProgress}
                                 onMouseDown={onMouseDown} onMouseUp={onMouseUp}/>
                </div>
            </div>

            <div className='row'>
                <div className='col col--1 col--offset-8'>
                    <VolumeBar value={volume} onChange={onVolumeChange}/>
                </div>
                <div className='col col--2'>
                    <ShareButton disabled={disabled} onClick={onShareClick}/>
                    <FavoriteButton value={videoIsFavorited} disabled={disabled} onClick={onFavoriteClick}/>
                </div>
            </div>

            <div className='row'>
                <div className="col col--7 col--offset-1">
                    <TagSelectButtonGroup setValue={setTag} value={tag} values={tags}/>
                </div>
            </div>
        </div>
    )
}
