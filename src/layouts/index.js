import styles from './index.less';
import {Eggs as GinEggs, Footer as GinFooter} from '@hocgin/ui';
import React from "react";

function BasicLayout(props) {
    // window.console.log = (...args) => {
    //     // ..
    // };
    // window.console.debug = (...args) => {
    //     // ..
    // };
    return (
        <div className={styles.wrapper}>
            <GinEggs/>
            {props.children}
            <GinFooter/>
        </div>
    );
}

export default BasicLayout;
