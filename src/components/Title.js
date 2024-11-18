import React from "react";

const Title = ({ text }) => {
    return (
        <div className='col col--8 col--offset-1'>
            <center>
                <h1>{text}</h1>
            </center>
        </div>
    );
}

export default Title;