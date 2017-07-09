import * as React from 'react';

import {PENDING,CORRECT,INCORRECT} from '../helpers/constants';

const ProgressBar = (props) => {
    const blocks = props.progress.length;

    return <div className="mmrz__progress_bar grid">
        {
            props.progress.map((_, i) => {
                const style = {
                    backgroundColor: _ == PENDING ? "gray" : (_ == CORRECT ? "#00D900" : "#E5000F"),
                    width: 1.0/blocks*100+"%"
                };

                return <div key={i} className="progress_bar__element left" style={style}></div>;
            })
        }
    </div>;
}

export default ProgressBar;
