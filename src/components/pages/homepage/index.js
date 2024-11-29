import React from "react";
import {Card} from 'primereact/card';
import {Changelog} from "./Changelog";
import {Chip} from "primereact/chip";
import styles from './styles.module.css'

export const Homepage = () => {
  return (
    <div className={'container'}>
      <Card>
        <div className={styles.main}>
          <span>Select <Chip key={'category'} label="Category" icon="pi pi-folder-open"/> on the sidebar. </span>
          <span>Pick <Chip key={'tag'} label="Tag" icon="pi pi-tags"/> below the video player. </span>
          <span>Choose <Chip key={'video'} label="Video" icon="pi pi-video"/> from <Chip key={'playlist'} label="Playlist" icon="pi pi-list"/></span>
        </div>
      </Card>
      <Changelog/>
    </div>
  )
}
