import React from "react";
import {Card} from 'primereact/card';
import {Changelog} from "../../components/Changelog";
import {Chip} from "primereact/chip";
import styles from './styles.module.css'

export const HomePage = () => {
  const categories = <Chip key={'categories'} label="Categories" icon="pi pi-folder-open"/>
  const playlist = <Chip key={'playlist'} label="Playlist" icon="pi pi-list"/>
  const game = <Chip key={'Game'} label="Game" icon="pi pi-file"/>
  const clip = <Chip key={'clip'} label="Clip" icon="pi pi-video"/>
  const tags = <Chip key={'tag'} label="Tag" icon="pi pi-tags"/>

  return (
    <div className={'container'}>
      <Card>
        <div className={styles.main}>
          <span>From {categories} on the sidebar, click a {game} to load the player. </span>
          <span>Change {tags} below the player to update the {playlist}, select a {clip} to begin playback. </span>
        </div>
      </Card>
      <Changelog/>
    </div>
  )
}
