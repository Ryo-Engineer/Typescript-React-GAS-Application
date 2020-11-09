import React from 'react';

import './Remaining.css'

type Props = {
    userTeam: string
    userName:string
    remainingPeriod:number
}

const Remaining: React.FC<Props> = (props) => {

    let value:number=props.remainingPeriod;
    const max:number=24;
    const optimum:number=24;
    const high:number=20;
    const low:number=10;

    return (
        <div className="Remaining">
            <div className="RemainingMonth">
                <ul className="Calendar">
                    <li>残</li>
                    <li id="img">{value}</li>
                    <li>ヶ月</li>
                </ul>

                <div className="Meter">
                    <meter value={value} max={max} low={low} high={high} optimum={optimum}/>
                </div>
            </div>
            <div className="RemainingTime">
                00:00
            </div>
        </div>

    );
}

export default Remaining;