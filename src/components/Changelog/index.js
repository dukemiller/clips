import React from "react";
import styles from './styles.module.css';
import ChangelogMarkdown from '!!raw-loader!../../../CHANGELOG.md'
import {Divider} from "primereact/divider";
import Markdown from "react-markdown";

export const Changelog = () => {
  const { changelogMarkdown, fileMarkdown } = processMarkdown(ChangelogMarkdown);

  return (
    <div className='row'>
      <div className='col col--5'>
        <ChangelogTable header='Changelog' icon='pi-book' markdown={changelogMarkdown}/>
      </div>

      <div className='col col--7'>
        <ChangelogTable header='File updates' icon='pi-file-plus' markdown={fileMarkdown}/>
      </div>
    </div>
  );
}

const ChangelogTable = (props) => {
  const { icon, header, markdown } = props;
  return (
    <>
      <Divider align="left" className={styles.divider}>
        <div className="inline-flex align-items-center">
          <i className={"pi " + icon}/>
          {header}
        </div>
      </Divider>
      <Markdown>{markdown}</Markdown>
    </>
  )
}

const processMarkdown = (path) => {
  const lines = path.split('\n').filter(line => line.trim());

  const changelogMarkdown = [];
  const fileMarkdown = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.includes('added/updated') || lower.includes('new files.')) {
      fileMarkdown.push(line);
    } else {
      changelogMarkdown.push(line);
    }
  }

  return { changelogMarkdown: changelogMarkdown.join("\n"), fileMarkdown: fileMarkdown.join("\n") };
};