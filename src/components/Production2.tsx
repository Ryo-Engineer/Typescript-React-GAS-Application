import React from 'react';

import {result} from './TrialAndProduction'
import './Production2.css'

import debug from "../index";


interface SubInterface extends result{
    userDep:string
}

const Production2: React.FC<SubInterface> = (props) => {

    const Ftoyota_illust_20200821: string = "https://firebasestorage.googleapis.com/v0/b/toyota-one-professionals.appspot.com/o/half%2Ftoyota_illust_20200821.png?alt=media&token=371021c6-5d25-43fd-b8c4-c3e69f79cfe3";

    return (
        <div className="Production2">
            <div id="container">
                <table>
                    <tbody>
                    <tr>
                        <td>トータルコスト</td>
                        <td><input type="text" value={props.P10}/></td>
                        <td>万円</td>
                    </tr>
                    <tr>
                        <td>設備コスト</td>
                        <td><input type="text" value={props.P11}/></td>
                        <td>万円</td>
                    </tr>
                    <tr>
                        <td>原材料コスト</td>
                        <td><input type="text" value={props.P12}/></td>
                        <td>万円 (一年分)</td>
                    </tr>
                    <tr>
                        <td>生産台数</td>
                        <td><input type="text" value={props.P13}/></td>
                        <td>台/月</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div id="container"><img alt="" src={Ftoyota_illust_20200821}/>
                <ul>
                    <li>{props.R70}</li>
                    <li>{props.R71}</li>
                    <li>{props.R72}</li>
                </ul>
            </div>
        </div>
    );
}

export default Production2;