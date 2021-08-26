import React from 'react';

function Container(props) {
    const styles = {
        width: "95%",
        marginLeft: "50px",
        marginRight: "50px"
    }
    return (
        <div style={styles}>{props.children}</div>
    )
}

export default Container