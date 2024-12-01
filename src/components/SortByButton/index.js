import React from "react";
import {Button} from "primereact/button";

export const SortByButton = ({ onClick, value }) => {
    return (
        <Button
            size="small"
            icon='pi pi-sort-alt'
            iconPos="right"
            style={{float: 'right', background: 'inherit'}}
            onClick={onClick}
            label={value === 'file' ? 'Filename' : 'Date created'}
            text
        />
    );
}
