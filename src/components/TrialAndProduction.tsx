import React, {useEffect, useState} from 'react';
import {firestore} from "../firebase";
import swal from "sweetalert";

import Production from "./Production";
import Production2 from "./Production2";
import {Props} from './SideMenuControl';

import './TrialAndProduction.css'
import test_items from '../data/testItem.json'

import debug from '../index'


interface props {
    [key: string]: any;
}


export interface result {
    backdoor_strength: number
    natural_frequency: number
    gross_weight: number
    drag_coefficient: number
    fuel_economy: number,
    expected_monthly_unit_sales: number
    T12: number
    T13: number
    T14: number
    T15: number
    T16: number
    T17: number
    S20: string
    S21: string
    S22: string
    S23: string
    S24: string
    S25: string
    P10: number
    P11: number
    P12: number
    P13: number
    R70: string
    R71: string
    R72: string
}

const TrialAndProduction: React.FC<Props> = (prop) => {

    const [resultDisplay, setResultDisplay] = useState<boolean>(false);
    const [tagList, setTagList] = useState([]);
    const [state, setState] = useState<props>({
        drag_coefficient: 1,
        weight_goal: 1,
        budget: 1,
        basic_shape: 1,
        material: 1,
        rf_board_thickness: 1,
        point_spacing: 1,
        length_l: 1,
        angle_t: 1,
        presence_or_absence_of_holes: 1,
        angle_a: 1,
        inner_outer_RF_press: 1,
        RF_press: 1,
        inner_outer_pour: 1,
        outer_painting: 1,
        outer_painting_units: 1,
        inner_RF_set: 1,
        inner_RF_set_units: 1,
        inner_RF_welding: 1,
        inner_RF_welding_units: 1,
        inner_RF_adhesive: 1,
        inner_RF_adhesive_units: 1,
        inner_RF_riveting: 1,
        inner_RF_riveting_units: 1,
        outer_set: 1,
        outer_set_units: 1,
        outer_adhesive_application: 1,
        outer_adhesive_application_units: 1,
        inner_cover: 1,
        inner_cover_units: 1,
        outer_bending: 1,
        outer_bending_units: 1,
        outer_pressurization: 1,
        new_technology: 1,
        welding_point_increase: 1,
        use_of_press_machine_for_outer_bending: 1,
        use_of_press_machine_for_outer_bending_units: 1,
        automatic_guided_vehicle: 1,
        staffing: 1,
        use_of_sensors_in_resin_molding: 1,
        burr_processing_grinder: 1,
        coloring_book_painting: 1,
    });

    const [result, setResult] = useState<result>({
        backdoor_strength: 0,
        natural_frequency: 0,
        gross_weight: 0,
        drag_coefficient: 0,
        fuel_economy: 0,
        expected_monthly_unit_sales: 0,
        T12: 0,
        T13: 0,
        T14: 0,
        T15: 0,
        T16: 0,
        T17: 0,
        S20: '',
        S21: '',
        S22: '',
        S23: '',
        S24: '',
        S25: '',
        P10: 0,
        P11: 0,
        P12: 0,
        P13: 0,
        R70: '',
        R71: '',
        R72: '',
    });


    const handleInputChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (e: any) => {
        e.persist();
        const name = e.target.name;
        const value = e.target.value;

        setState((state) => {
            return {...state, [name]: value};
        });
        debug(name, 'n');
        debug(value, 'n');
        debug(state, 'n');
    }

    const submitAlert = (e: React.MouseEvent) => {
        e.persist();
        e.preventDefault();
        const error = Object.values(state).some((value) => {
            return value.length === 0;
        });

        if (error) {
            debug(error, 'n');

            alert('未入力項目があります');
        } else {
            debug(prop, 'a');


            swal({
                title: `「試作」を実行しますか?`,
                text: "残り時間を3ヶ月使用します",
                icon: "warning",
                dangerMode: true,
            })
                .then(willDelete => {
                    if (willDelete) {
                        const remainingPeriod: number = prop.remainingPeriod - 3;
                        debug(remainingPeriod, 'n');
                        firestore.collection('remainingPeriod').doc(prop.userTeam).collection(prop.userDep).doc('value').set({
                            remainingPeriod: remainingPeriod
                        });
                        firestore.collection('Tested').doc(prop.userTeam).collection(prop.userDep).doc('value').set({
                            Tested: true
                        });

                        debug(prop.userDep, 'n');
                        if (prop.userDep === 'PlanningAndEvaluation' || prop.userDep === 'IndustrialTechnology') {
                            firestore.collection('Tested').doc(prop.userTeam).collection('Design').doc('value').onSnapshot(
                                (snapshot) => {

                                    if (!snapshot.exists) {
                                        debug('not exist', 's');
                                        swal("テスト情報を送信しました\n設計部門のテストが送信された後 結果が表示されます", "残り時間を3ヶ月使用しました", "success");
                                    } else {
                                        exeTest()
                                    }
                                })
                        } else if (prop.userDep === 'Design') {
                            debug('not exist', 's');
                            firestore.collection('Tested').doc(prop.userTeam).collection('PlanningAndEvaluation').doc('value').onSnapshot(
                                (snapshot) => {

                                    if (!snapshot.exists) {
                                        swal("テスト情報を送信しました 企画・評価 生産技術部門のテストが送信された後 結果が表示されます", "残り時間を3ヶ月使用しました", "success");
                                    } else {
                                        exeTest()
                                    }


                                })


                            // firestore.collection('Tested').doc(prop.userTeam).collection('PlanningAndEvaluation').doc('value').onSnapshot(
                            //     (snapshot) => {
                            //         if (!snapshot.exists) {
                            //
                            //         firestore.collection('Tested').doc(prop.userTeam).collection('IndustrialTechnology').doc('value').onSnapshot(
                            //             (snapshot2) => {
                            //
                            //                 debug('not exist', 's');
                            //                 if (!snapshot.exists && !snapshot2.exists) {
                            //                     swal("テスト情報を送信しました", "企画・評価 生産技術部門のテストが送信された後 結果が表示されます", "残り時間を3ヶ月使用しました", "success");
                            //                 } else if (!snapshot.exists && snapshot2.exists) {
                            //                     swal("テスト情報を送信しました", "企画・評価部門のテストが送信された後 結果が表示されます", "残り時間を3ヶ月使用しました", "success");
                            //                 } else if (snapshot.exists && !snapshot2.exists) {
                            //                     swal("テスト情報を送信しました", "生産技術部門のテストが送信された後 結果が表示されます", "残り時間を3ヶ月使用しました", "success");
                            //                 } else {
                            //                     hoge()
                            //                 }
                            //             })
                            //         }
                            //     })
                        }
                        // swal("追加情報を取得しました!", "残り時間を3ヶ月使用しました", "success");
                        // const url = 'https://script.google.com/macros/s/AKfycbzjhpiHKPygN4GCrtIBX6U_Bf5rlDEzV0-aCl8ME2o0NNXQlQA/exec';
                        // postData(url, state)
                        //     .then(result => {
                        //         debug(JSON.parse(result).value, 'n');
                        //         setResult(JSON.parse(result).value);
                        //     });
                        // setResultDisplay(true);
                    }
                });
        }
    };

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        return response.json();
    }

    function exeTest() {
        swal("テストを実行しました!", "残り時間を3ヶ月使用しました", "success");
        const url = 'https://script.google.com/macros/s/AKfycbzjhpiHKPygN4GCrtIBX6U_Bf5rlDEzV0-aCl8ME2o0NNXQlQA/exec';
        postData(url, state)
            .then(result => {
                debug(JSON.parse(result).value, 's');
                setResult(JSON.parse(result).value);
            });
        setResultDisplay(true);
    }

    useEffect(() => {

        const trList: any = [];
        test_items.map((test_item, i) => {
            if (test_item.department === prop.selectDep) {
                const optList: any = [];
                test_item.values.forEach((value: any, j: number) =>
                    optList.push(
                        <option key={i * 10 + j} value={j}>
                            {value}
                        </option>
                    ));
                const optList2: any = [];
                for (let i = 1; i < 10; i++) {
                    optList2.push(
                        <option key={i} value={i}>
                            {i}台
                        </option>)
                }
                if (test_item.type === "select") {
                    if (test_item.units) {
                        trList.push(
                            <tr key={i}>
                                <td><label>{test_item.physicalName}</label></td>
                                <td><select name={test_item.logicalName} onChange={handleInputChange}>{optList}</select>
                                </td>
                                <td><select name={test_item.logicalName + "_units"}
                                            onChange={handleInputChange}
                                            disabled={state[test_item.logicalName] === 1}>{optList2}</select></td>
                            </tr>
                        );
                    } else {
                        trList.push(
                            <tr key={i}>
                                <td><label>{test_item.physicalName}</label></td>
                                <td><select name={test_item.logicalName} onChange={handleInputChange}>{optList}</select>
                                </td>
                            </tr>
                        );
                    }
                } else if (test_item.type === "checkbox") {
                    if (test_item.units) {
                        trList.push(
                            <tr key={i}>
                                <td><label>{test_item.physicalName}</label></td>
                                <td><input type="checkbox" name={test_item.logicalName} onChange={handleInputChange}/></td>
                                    <td><select name={test_item.logicalName + "_units"}
                                                onChange={handleInputChange}
                                                disabled={state[test_item.logicalName] === 1}>{optList2}</select></td>

                            </tr>
                        );
                    } else {
                        trList.push(
                            <tr key={i}>
                                <td><label>{test_item.physicalName}</label></td>
                                <td><input type="checkbox" name={test_item.logicalName} onChange={handleInputChange}/>
                                </td>
                            </tr>
                        );
                    }
                }
            }
        });
        setTagList(trList);

    }, [state, prop]);

    return (
        <div className="TrialAndProduction">
            {!resultDisplay && <form>
                <table>
                    <tbody>
                    {tagList}
                    </tbody>
                </table>
                <button onClick={submitAlert} disabled={prop.selectDep !== prop.userDep}>テスト実施</button>
            </form>}
            {resultDisplay && (prop.userDep === 'PlanningAndEvaluation' || prop.userDep === 'Design') &&
            <Production {...result} userDep={prop.userDep}/>}
            {resultDisplay && (prop.userDep === 'IndustrialTechnology' || prop.userDep === 'Design') &&
            <Production2 {...result} userDep={prop.userDep}/>}
        </div>
    );
}

export default TrialAndProduction;

