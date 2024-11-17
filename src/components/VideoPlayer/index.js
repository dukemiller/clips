import 'primeicons/primeicons.css';
import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import React, {useRef, useState, useMemo} from 'react'
import ReactPlayer from 'react-player';
import {ListBox} from 'primereact/listbox';
import {SelectButton} from 'primereact/selectbutton';
import {Button} from 'primereact/button';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Toast} from 'primereact/toast';
import {Badge} from 'primereact/badge';
import {useFavoritePages} from '../FavoritesContextProvider';

let globalVolume = 0.6
let globalSortBy = "file"

const Player = ({ videos, toast, video, setVideo, sortBy, setSortBy }) => {

    const [loading, setLoading] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const [played, setPlayed] = useState(0.0);
    const [volume, setVolume] = useState(globalVolume);

    const player = useRef(null);

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

    // 46 -> 32
    // 1440 -> 1080

    const videoTemplate = (video) => {
        return (
            <div>
                <div>{video.favorite && <i className='pi pi-star-fill'
                                           style={{ color: 'gold', fontSize: '1em' }}>&nbsp;</i>}{video.file}</div>
            </div>
        );
    }

    return (
        <>
            <div className='row'>
                {/* video */}
                <div className='col col--8 col--offset-1'>
                    <div style={{ height: '46rem', background: 'black' }}>
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
                            onBuffer={handleOnBuffer}
                            onBufferEnd={handleOnBufferEnd}
                            onProgress={handleProgress}
                        />}
                    </div>
                </div>

                {/* playlist */}
                <div className='col col--2'>
                    <ListBox
                        value={video}
                        options={videos}
                        itemTemplate={videoTemplate}
                        optionLabel={"file"}
                        onChange={handleChangeSelectedVideo}
                        focusOnHover={true}
                        listStyle={{ height: '46rem' }}
                    />

                </div>
            </div>

            <div className='row' >
                {/* progress bar */}
                <div className='col col--8 col--offset-1'>
                    <input
                        type='range'
                        style={{ width: '100%' }}
                        min={0} max={0.999999}
                        step='any'
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                        onProgress={handleProgress}
                    />
                </div>

                {/* sort-by button */}
                <div className='col col--2'>
                    <Button
                        size="small"
                        icon='pi pi-sort-alt'
                        iconPos="right"
                        style={{ float: 'right' }}
                        onClick={handleSortClick}
                        label={sortBy === 'file' ? 'Filename' : 'Date created'}
                        text
                    />
                </div>

            </div>

            <div className='row'>

                {/* volume bar */}
                <div className='col col--1 col--offset-8' style={{ marginTop: '-20px' }}>
                    <input type='range' min={0} max={1} step='any' style={{ width: '100%' }} value={volume}
                           onChange={handleVolumeChange}/>
                </div>

                {/* share button */}
                <div className='col col--2' style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginLeft: 'auto' }}>
                            <span className='btn-info-text' style={{ marginRight: '5px' }}>Share</span>
                            <button onClick={handleShareClick} disabled={video == null}>
                                <i className='pi pi-share-alt' style={{ fontSize: '1.5em' }}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const VideoPlayer = ({ title, videos }) => {

    const toast = useRef(null);

    const { favoritePages, setFavoritePages } = useFavoritePages();
    const [video, setVideo] = useState(null);
    const [tag, setTag] = useState('Untagged');
    const [sortBy, setSortBy] = useState(globalSortBy);

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

    const handleToggleFavorite = () => {
        const key = `${title}.${tag}.${video.file}`;
        if (favoritePages.includes(key)) {
            setFavoritePages(favoritePages.filter(f => f !== key))
            // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Removed clip from favorites.', life: 1000 });
        } else {
            setFavoritePages([...favoritePages, key])
            // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Added clip to favorites.', life: 1000 });
        }
    }

    const tagsTemplate = ({ name, count }) => {
        let coloring = name === "Untagged" ? "rgba(211,211,211,0.7)" : "white";
        let text = name === "Untagged" ? "(untagged)" : name
        return (
            <div><span style={{ color: coloring }}>{text}</span> <Badge value={count} severity={'contrast'}/></div>
        );
    }

    const isFavorite = useMemo(() => video != null && favoritePages.includes(`${title}.${tag}.${video.file}`), [favoritePages, video])
    const favoriteIcon = isFavorite ? "pi pi-star-fill" : "pi pi-star"
    return (
        <div>
            <Toast ref={toast} position="bottom-right"/>

            {/* title */}
            <div className='row row--no-gutters'>
                <div className='col col--8 col--offset-1'>
                    <center>
                        <h1>{title}</h1>
                    </center>
                </div>
            </div>

            <Player
                videos={taggedVideos}
                video={video} setVideo={setVideo}
                toast={toast}
                isFavorite={isFavorite}
                sortBy={sortBy} setSortBy={setSortBy}
            />

            <div className='row'>

                {/* tags */}
                <SelectButton
                    allowEmpty={false}
                    className={'col col--7 col--offset-1'}
                    style={{ marginTop: '-40px' }}
                    value={tag}
                    options={tags}
                    itemTemplate={tagsTemplate}
                    optionValue={'name'}
                    optionLabel={'name'}
                    onChange={({ value }) => setTag(value || "Untagged")}
                />

                {/* favorite button */}
                <div className='col col--2 col--offset-1'>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginLeft: 'auto' }}>
                            <span className='btn-info-text' style={{ marginRight: '5px' }}>Favorite</span>
                            <button onClick={handleToggleFavorite} disabled={video == null}>
                                <i className={favoriteIcon} style={{ 'fontSize': '1.5em' }}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer;