import TagSelectButton from "./TagSelectButton";
import {SelectButton} from "primereact/selectbutton";
import React from "react";

const TagSelector = ({ value, setValue, values }) => {
    return (
        <SelectButton
            allowEmpty={false}
            value={value}
            options={values}
            itemTemplate={TagSelectButton}
            optionValue={'name'}
            optionLabel={'name'}
            onChange={({ value }) => setValue(value || "Untagged")}
        />
    );
}

export default TagSelector;