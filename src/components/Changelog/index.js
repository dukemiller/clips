import React from "react";
import styles from './styles.module.css';
import ChangelogText from '../../../CHANGELOG.md'
import {Divider} from "primereact/divider";

export const Changelog = () => {
  return (
    <div>
      <Divider align="left" className={styles.divider}>
        <div className="inline-flex align-items-center">
          <i className="pi pi-book" />
          Changelog
        </div>
      </Divider>
      <ChangelogText/>
    </div>
  );
}
