import React, {useEffect, useRef, useState} from "react";
import {PlaylistItem} from "../PlaylistItem";
import {ListBox} from "primereact/listbox";
import styles from './styles.module.css'

export const Playlist = ({ value, values, onChange }) => {
    const listBoxRef = useRef(null);

    useEffect(() => {
        if (value && listBoxRef.current) {
            setTimeout(() => {
                const domElement = listBoxRef.current.getElement();
                const selectedElement = domElement.querySelector('.p-highlight');
                if (selectedElement) {
                    // Use the stored original function
                    const originalScrollIntoView = selectedElement.originalScrollIntoView || Element.prototype.scrollIntoView;
                    originalScrollIntoView.call(selectedElement, {
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);
        }
    }, [value]);

    useEffect(() => {
        if (listBoxRef.current) {
            const domElement = listBoxRef.current.getElement();

            const disableScrollIntoView = () => {
                const items = domElement.querySelectorAll('.p-listbox-item');
                items.forEach(item => {
                    if (!item.originalScrollIntoView) {
                        item.originalScrollIntoView = item.scrollIntoView;
                        item.scrollIntoView = () => {}; // Block auto-scroll
                    }
                });
            };

            disableScrollIntoView();

            const observer = new MutationObserver(disableScrollIntoView);
            observer.observe(domElement, { childList: true, subtree: true });

            return () => observer.disconnect();
        }
    }, []);

    return (
        <ListBox
            ref={listBoxRef}
            value={value}
            options={values}
            itemTemplate={PlaylistItem}
            optionLabel={"file"}
            onChange={onChange}
            focusOnHover={true}
            className={styles.main}
            listClassName={styles.playlist}
        />
    );
}
