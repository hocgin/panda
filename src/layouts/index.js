import styles from './index.less';
import GinEggs from '@hocgin/gin-eggs';
import GinFooter from '@hocgin/gin-footer'
import React from "react";

function BasicLayout(props) {
    window.console.log = (...args) => {
        // ..
    };
    window.console.debug = (...args) => {
        // ..
    };
    return (
        <div className={styles.wrapper}>
            <GinEggs/>
            {props.children}
            <GinFooter/>
        </div>
    );
}

export default BasicLayout;
