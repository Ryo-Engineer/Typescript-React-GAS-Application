import React from 'react';
import {RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip} from 'recharts';

import {result} from './TrialAndProduction'
import './Production.css'

import debug from "../index";

//
// export interface Props {
//     result: {
//         backdoor_strength: number
//         natural_frequency: number
//         gross_weight: number
//         drag_coefficient: number
//         fuel_economy: number,
//         expected_monthly_unit_sales: number
//         T12:number
//         T13:number
//         T14:number
//         T15:number
//         T16:number
//         T17:number
//     }
// }

interface SubInterface extends result{
    userDep:string
}

const Production: React.FC<SubInterface> = (props) => {


    const dataRadar = [
        {rank: '強度', value: props.T12},
        {rank: '静粛性能', value: props.T13},
        {rank: '重量', value: props.T14},
        {rank: '材料コスト', value: props.T15},
        {rank: '燃費', value: props.T16},
        {rank: '意匠性', value: props.T17},
    ];


    const Ftoyota_illust_20200821: string = "https://firebasestorage.googleapis.com/v0/b/toyota-one-professionals.appspot.com/o/half%2Ftoyota_illust_20200821.png?alt=media&token=371021c6-5d25-43fd-b8c4-c3e69f79cfe3";

    return (
        <div className="Production">
            <div id="container">
                <table>
                    <tbody>
                    <tr>
                        <td>バックドア強度(最大応力)</td>
                        <td><input type="text" value={props.backdoor_strength}/></td>
                        <td>MPa</td>
                    </tr>
                    <tr>
                        <td>固有振動数</td>
                        <td><input type="text" value={props.natural_frequency}/></td>
                        <td>Hz</td>
                    </tr>
                    <tr>
                        <td>バックドア+スポイラー重量合計</td>
                        <td><input type="text" value={props.gross_weight}/></td>
                        <td>kg</td>
                    </tr>
                    <tr>
                        <td>Cd値</td>
                        <td><input type="text" value={props.drag_coefficient}/></td>
                    </tr>
                    <tr>
                        <td>燃費</td>
                        <td><input type="text" value={props.fuel_economy}/></td>
                        <td>km/l</td>
                    </tr>
                    <tr>
                        <td>月間売上見込み数</td>
                        <td><input type="text" value={props.expected_monthly_unit_sales}/></td>
                        <td>台</td>
                    </tr>
                    </tbody>
                </table>
                <RadarChart // レーダーチャートのサイズや位置、データを指定
                    height={300} //レーダーチャートの全体の高さを指定
                    width={400} //レーダーチャートの全体の幅を指定
                    cx="50%" //要素の左を基準に全体の50%移動
                    cy="50%" //要素の上を基準に全体の50%移動
                    data={dataRadar} //ここにArray型のデータを指定
                >
                    <PolarGrid/> // レーダーのグリッド線を表示
                    <PolarAngleAxis
                        dataKey="rank" //Array型のデータの、数値を表示したい値のキーを指定
                    />
                    <Radar //レーダーの色や各パラメーターのタイトルを指定
                        name="Mike"  //hoverした時に表示される名前を指定
                        dataKey="value" //Array型のデータのパラメータータイトルを指定
                        stroke="#8884d8"  //レーダーの線の色を指定
                        fill="#8884d8" //レーダーの中身の色を指定
                        fillOpacity={0.6} //レーダーの中身の色の薄さを指定
                    />
                    <Tooltip/> //hoverすると各パラメーターの値が表示される
                </RadarChart>
            </div>
            <div id="container"><img alt="" src={Ftoyota_illust_20200821}/>
                <ul>
                    <li>{props.S20}</li>
                    <li>{props.S21}</li>
                    <li>{props.S22}</li>
                    <li>{props.S23}</li>
                    <li>{props.S24}</li>
                    <li>{props.S25}</li>
                </ul>
            </div>
        </div>
    );
}

export default Production;