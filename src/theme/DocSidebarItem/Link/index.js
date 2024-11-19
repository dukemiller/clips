import React, {useState} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import styles from './styles.module.css';
import {Tag} from "primereact/tag";

const HoverBadge = ({ value, isVisible }) => {
    return (
        <div style={{
            marginLeft: 'auto',
            float: 'right',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Tag
                value={value}
                style={{
                    display: "inline-block",
                    color: '#9FA8DA',
                    backgroundColor: '#121212',
                    visibility: isVisible ? "visible" : "hidden"
                }}
            />
        </div>
    );
};

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const {href, label, className, autoAddBaseUrl} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        {label}{item.customProps && <HoverBadge value={item.customProps.count} isVisible={isVisible}/>}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
