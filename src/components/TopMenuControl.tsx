import React, {useState} from 'react';

import './TopMenuControl.css';

import deps from '../data/department.json'

import debug from "../index";

type Props = {
    userTeam: string
    userDep: string
    userName: string
    selectDep: string
    onButtonClick2: React.MouseEventHandler<HTMLButtonElement>
}


const TopMenuControl: React.FC<Props> = (props) => {

    const tabList: any = [];
    deps.forEach((p, i) => {
        let selectedId: string = '';

        if (props.selectDep === p.logicalName) {
            selectedId = 'selected';
        }
        tabList.push(
            <li key={i} id={selectedId} className={p.logicalName}>
                <button onClick={props.onButtonClick2} value={p.logicalName}>{p.physicalName}</button>
            </li>
        );
    });


    return (
        <div className="TopMenuControl">
            <ul className='part1'>
                {tabList}
            </ul>
            <ul className='part2'>
                <li>アナウンス</li>
                <li>ルール</li>
            </ul>
            <ul className='part3'>
                <li id='TeamName'>team:{props.userTeam}</li>
                <li>department:{props.userDep}</li>
                <li>username:{props.userName}</li>
            </ul>
        </div>
    );
}

export default TopMenuControl;