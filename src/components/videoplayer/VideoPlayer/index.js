import 'primeicons/primeicons.css';
import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import React, {useEffect, useMemo, useRef, useState} from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser';
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
  const [paused, setPaused] = useState(false);
  const player = useRef(null);
  const isProdBrowser = useIsBrowser() && process.env.NODE_ENV === "production";
  const disabled = video == null
  const videoIsFavorited = useMemo(() => !disabled && favoritePages.includes(`${title}.${tag}.${video.file}`), [favoritePages, video])

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

  const onProgressBarMouseDown = () => setSeeking(true);

  const onProgressBarChange = (e) => setPlayed(parseFloat(e.target.value));

  const onProgressBarMouseUp = (e) => {
    setSeeking(false)
    player.current.seekTo(e.target.value);
  };

  const onProgress = ({ played }) => {
    if (!seeking)
      setPlayed(played);
  };

  const onPlayerBuffer = () => setLoading(true);

  const onPlayerBufferEnd = () => {
    if (loading)
      setLoading(false);
  };

  const onVolumeChange = ({ target: { value } }) => {
    let decrease = parseFloat(value) < volume;
    setVolume(parseFloat(value))
    globalVolume = parseFloat(value);
    if (isProdBrowser) window.umami.track('volume_click', {
      action: decrease ? 'decrease' : 'increase',
      video: video,
      category: title,
      tag: tag
    })
  }

  const onVideoChange = ({ value }) => {
    setPaused(false);
    setPlayed(0.0);
    setVideo(value);
    setLoading(true);
    if (isProdBrowser && value != null && value !== "") window.umami.track('video_click', {
      video: value,
      category: title,
      tag: tag
    })
  }

  const onTagChange = (value) => {
    setTag(value)
    if (isProdBrowser) window.umami.track('tag_click', {
      category: title,
      tag: value
    })
  };

  const onShareClick = async () => {
    if (video != null) {
      await navigator.clipboard.writeText(encodeURI(video.url));
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Clip URL copied to clipboard.',
        life: 2000
      });
      if (isProdBrowser) window.umami.track('share_click', {
        video: video,
        category: title,
        tag: tag
      })
    }
  }

  const onSortClick = () => {
    setSortBy((prev) => {
      let value = prev === 'file' ? 'date' : 'file';
      globalSortBy = value;
      if (isProdBrowser) window.umami.track('sort_click', {
        video: video,
        category: title,
        tag: tag
      })
      return value;
    })
  };

  const onPlayerClick = () => {
    if (!disabled) {
      setPaused(!paused)
      if (isProdBrowser) window.umami.track('video_pause', {
        action: !paused ? "pause" : "unpause",
        video: video,
        category: title,
        tag: tag
      })
    }
  }

  const onFavoriteClick = () => {
    const key = `${title}.${tag}.${video.file}`;
    const included = favoritePages.includes(key)
    if (included) {
      setFavoritePages(favoritePages.filter(f => f !== key))
    } else {
      setFavoritePages([...favoritePages, key])
    }
    if (isProdBrowser && !disabled) window.umami.track('favorite_click', {
      action: included ? 'unfavorite' : 'favorite',
      video: video,
      category: title,
      tag: tag
    })
  }


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
          <Player video={video} volume={volume} player={player} loading={loading} paused={paused}
                  onClick={onPlayerClick} onBuffer={onPlayerBuffer} onBufferEnd={onPlayerBufferEnd}
                  onProgress={onProgress}/>
        </div>
        <div className='col col--2'>
          <Playlist value={video} values={taggedVideos} onChange={onVideoChange}/>
          <SortByButton value={sortBy} onClick={onSortClick}/>
        </div>
      </div>

      <div className='row'>
        <div className='col col--8 col--offset-1'>
          <ProgressBar value={played}
                       onChange={onProgressBarChange} onProgress={onProgress}
                       onMouseDown={onProgressBarMouseDown} onMouseUp={onProgressBarMouseUp}/>
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
          <TagSelectButtonGroup onChange={onTagChange} value={tag} values={tags}/>
        </div>
      </div>
    </div>
  )
}
