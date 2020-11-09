import {firestore} from "./firebase";

import deps from './data/department.json'
import teams from './data/team.json'
import addInfos from './data/additionalInformation.json'


function init() {
    deleteCollection(firestore, 'pages', 30).then(() =>
        createPages()
    );
    // deleteCollection(firestore, 'tests', 30).then(() =>
    //     createPlanningAndEvaluationTests()
    // );
    deleteCollection(firestore, 'remainingPeriod', 30).then(() =>
        createCalendar()
    );
    deleteCollection(firestore, 'ObtAddInfo', 30).then(() =>
        createObtAddInfo()
    );

}

function deleteCollection(db: any, collectionPath: string, batchSize: number) {
    let collectionRef = db.collection(collectionPath);
    let query = collectionRef.orderBy('logicalName').limit(batchSize);
    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}

function deleteQueryBatch(db: any, query: any, batchSize: number, resolve: any, reject: any) {
    query.get()
        .then((snapshot: any) => {
            if (snapshot.size === 0) {
                return 0;
            }
            let batch = db.batch();
            snapshot.docs.forEach((doc: any) => {
                batch.delete(doc.ref);
            });
            return batch.commit().then(() => {
                return snapshot.size;
            });
        }).then((numDeleted: any) => {
        if (numDeleted === 0) {
            resolve();
            return;
        }
        process.nextTick(() => {
            deleteQueryBatch(db, query, batchSize, resolve, reject);
        });
    })
        .catch(reject);
}

function createPages() {
    let citiesRef = firestore.collection('pages');
    citiesRef.doc('BI').set({
        department: 'PlanningAndEvaluation',
        logicalName: 'BasicInformation',
        physicalName: '基本情報',
        group: 1,
        sequence: 1,
    });
    citiesRef.doc('AI').set({
        department: 'PlanningAndEvaluation',
        logicalName: 'AdditionalInformation',
        physicalName: '追加情報',
        group: 1,
        sequence: 2,
    });
    citiesRef.doc('TAP').set({
        department: 'PlanningAndEvaluation',
        logicalName: 'TrialAndProduction',
        physicalName: '試作・本制作',
        group: 1,
        sequence: 3,
    });
    // citiesRef.doc('T1').set({
    //     department.json: 'PlanningAndEvaluation',
    //     logicalName: 'Test1',
    //     physicalName: 'テスト1',
    //     group: 2,
    //     sequence: 1,
    // });
    // citiesRef.doc('T2').set({
    //     department.json: 'PlanningAndEvaluation',
    //     logicalName: 'Test2',
    //     physicalName: 'テスト2',
    //     group: 2,
    //     sequence: 2,
    // });
    // citiesRef.doc('T3').set({
    //     department.json: 'PlanningAndEvaluation',
    //     logicalName: 'Test3',
    //     physicalName: 'テスト3',
    //     group: 2,
    //     sequence: 3,
    // });
    citiesRef.doc('P').set({
        department: 'PlanningAndEvaluation',
        logicalName: 'Production',
        physicalName: '結果',
        group: 2,
        sequence: 4,
    });
    // citiesRef.doc('SR').set({
    //     logicalName: 'SalesResult',
    //     physicalName: '販売結果',
    //         // });
    // citiesRef.doc('LB').set({
    //     logicalName: 'LookingBack',
    //     physicalName: '振り返り',
    //         // });
    // citiesRef.doc('').set({
    //     logicalName: '',
    //     physicalName: '',
    // });
}


// function createPlanningAndEvaluationTests() {
//     let citiesRef = firestore.collection('PlanningAndEvaluationTests');
//     citiesRef.doc('DC').set({
//         department: 'PlanningAndEvaluation',
//         logicalName: 'drag_coefficient',
//         physicalName: 'Cd値',
//         items_count: 7,
//         group: 1,
//         sequence: 1,
//     });
//     citiesRef.doc('DC').collection('inputs').doc('input1').set({value: '0.25'});
//     citiesRef.doc('DC').collection('inputs').doc('input2').set({value: '0.26'});
//     citiesRef.doc('DC').collection('inputs').doc('input3').set({value: '0.27'});
//     citiesRef.doc('DC').collection('inputs').doc('input4').set({value: '0.28'});
//     citiesRef.doc('DC').collection('inputs').doc('input5').set({value: '0.29'});
//     citiesRef.doc('DC').collection('inputs').doc('input6').set({value: '0.30'});
//     citiesRef.doc('DC').collection('inputs').doc('input7').set({value: '0.31'});
//
//     citiesRef.doc('WG').set({
//         department: 'PlanningAndEvaluation',
//         logicalName: 'weight_goal',
//         physicalName: '重量目標',
//         items_count: 5,
//         group: 1,
//         sequence: 2,
//     });
//     citiesRef.doc('WG').collection('inputs').doc('input1').set({value: '12kg以内'});
//     citiesRef.doc('WG').collection('inputs').doc('input2').set({value: '15kg以内'});
//     citiesRef.doc('WG').collection('inputs').doc('input3').set({value: '18kg以内'});
//     citiesRef.doc('WG').collection('inputs').doc('input4').set({value: '21kg以内'});
//     citiesRef.doc('WG').collection('inputs').doc('input5').set({value: '24kg以内'});
//
//     citiesRef.doc('B').set({
//         department: 'PlanningAndEvaluation',
//         logicalName: 'budget',
//         physicalName: '予算',
//         items_count: 7,
//         group: 1,
//         sequence: 3,
//     });
//     citiesRef.doc('B').collection('inputs').doc('input1').set({value: '4億円以内'});
//     citiesRef.doc('B').collection('inputs').doc('input2').set({value: '5億円以内'});
//     citiesRef.doc('B').collection('inputs').doc('input3').set({value: '6億円以内'});
//     citiesRef.doc('B').collection('inputs').doc('input4').set({value: '7億円以内'});
//     citiesRef.doc('B').collection('inputs').doc('input5').set({value: '8億円以内'});
//     citiesRef.doc('B').collection('inputs').doc('input6').set({value: '9億円以内'});
//     citiesRef.doc('B').collection('inputs').doc('input7').set({value: '9億円超'});
//
//     citiesRef.doc('BS').set({
//         department: 'Design',
//         logicalName: 'basic_shape',
//         physicalName: '基本形状',
//         items_count: 3,
//         group: 2,
//         sequence: 1,
//     });
//     citiesRef.doc('BS').collection('inputs').doc('input1').set({value: 'パターンA'});
//     citiesRef.doc('BS').collection('inputs').doc('input2').set({value: 'パターンB'});
//     citiesRef.doc('BS').collection('inputs').doc('input3').set({value: 'パターンC'});
//
//     citiesRef.doc('M').set({
//         department: 'Design',
//         logicalName: 'material',
//         physicalName: '材質',
//         items_count: 3,
//         group: 2,
//         sequence: 2,
//     });
//     citiesRef.doc('M').collection('inputs').doc('input1').set({value: '鉄/鉄/鉄'});
//     citiesRef.doc('M').collection('inputs').doc('input2').set({value: 'アルミニウム/アルミニウム/アルミニウム'});
//     citiesRef.doc('M').collection('inputs').doc('input3').set({value: '樹脂/樹脂/鉄'});
//
//     citiesRef.doc('RBT').set({
//         department: 'Design',
//         logicalName: 'rf_board_thickness',
//         physicalName: 'RFの板厚',
//         items_count: 6,
//         group: 2,
//         sequence: 3,
//     });
//     citiesRef.doc('RBT').collection('inputs').doc('input1').set({value: '1.3mm'});
//     citiesRef.doc('RBT').collection('inputs').doc('input2').set({value: '1.4mm'});
//     citiesRef.doc('RBT').collection('inputs').doc('input3').set({value: '1.5mm'});
//     citiesRef.doc('RBT').collection('inputs').doc('input4').set({value: '1.6mm'});
//     citiesRef.doc('RBT').collection('inputs').doc('input5').set({value: '1.7mm'});
//     citiesRef.doc('RBT').collection('inputs').doc('input6').set({value: '1.8mm'});
//
//     citiesRef.doc('PS').set({
//         department: 'Design',
//         logicalName: 'point_spacing',
//         physicalName: '打点間距離',
//         items_count: 4,
//         group: 2,
//         sequence: 4,
//     });
//     citiesRef.doc('PS').collection('inputs').doc('input1').set({value: '30mm'});
//     citiesRef.doc('PS').collection('inputs').doc('input2').set({value: '25mm'});
//     citiesRef.doc('PS').collection('inputs').doc('input3').set({value: '20mm'});
//     citiesRef.doc('PS').collection('inputs').doc('input4').set({value: '打点無し(///要確認///)'});
//
//     citiesRef.doc('LL').set({
//         department: 'Design',
//         logicalName: 'length_l',
//         physicalName: '長さL',
//         items_count: 4,
//         group: 2,
//         sequence: 5,
//     });
//     citiesRef.doc('LL').collection('inputs').doc('input1').set({value: '100mm'});
//     citiesRef.doc('LL').collection('inputs').doc('input2').set({value: '200mm'});
//     citiesRef.doc('LL').collection('inputs').doc('input3').set({value: '300mm'});
//     citiesRef.doc('LL').collection('inputs').doc('input4').set({value: '400mm'});
//
//     citiesRef.doc('AT').set({
//         department: 'Design',
//         logicalName: 'angle_t',
//         physicalName: '角度θ',
//         items_count: 4,
//         group: 2,
//         sequence: 6,
//     });
//     citiesRef.doc('AT').collection('inputs').doc('input1').set({value: '5度'});
//     citiesRef.doc('AT').collection('inputs').doc('input2').set({value: '10度'});
//     citiesRef.doc('AT').collection('inputs').doc('input3').set({value: '15度'});
//     citiesRef.doc('AT').collection('inputs').doc('input4').set({value: '20度'});
//
//     citiesRef.doc('PAH').set({
//         department: 'Design',
//         logicalName: 'presence_or_absence_of_holes',
//         physicalName: '穴の有無',
//         items_count: 2,
//         group: 2,
//         sequence: 7,
//     });
//     citiesRef.doc('PAH').collection('inputs').doc('input1').set({value: '穴有り'});
//     citiesRef.doc('PAH').collection('inputs').doc('input2').set({value: '穴無し'});
//     citiesRef.doc('PAH').collection('inputs').doc('input3').set({value: ''});
//
//     citiesRef.doc('AA').set({
//         department: 'Design',
//         logicalName: 'angle_a',
//         physicalName: '角度α',
//         items_count: 4,
//         group: 2,
//         sequence: 8,
//     });
//     citiesRef.doc('AA').collection('inputs').doc('input1').set({value: '20度'});
//     citiesRef.doc('AA').collection('inputs').doc('input2').set({value: '30度'});
//     citiesRef.doc('AA').collection('inputs').doc('input3').set({value: '40度'});
//     citiesRef.doc('AA').collection('inputs').doc('input4').set({value: '50度'});
//
//     citiesRef.doc('IOR').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'inner_outer_RF-press',
//         physicalName: 'インナー・アウター・RFのプレス',
//         items_count: 1,
//         group: 3,
//         sequence: 1,
//     });
//     citiesRef.doc('IOR').collection('inputs').doc('input1').set({value: '設定調整'});
//     citiesRef.doc('IOR').collection('inputs').doc('input2').set({value: '型の入れ替え'});
//     citiesRef.doc('IOR').collection('inputs').doc('input3').set({value: '新プレス機の導入'});
//
//     citiesRef.doc('R').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'RF-press',
//         physicalName: 'RFのプレス',
//         items_count: 1,
//         group: 3,
//         sequence: 2,
//     });
//     citiesRef.doc('R').collection('inputs').doc('input1').set({value: '設定調整'});
//     citiesRef.doc('R').collection('inputs').doc('input2').set({value: '型の入れ替え'});
//     citiesRef.doc('R').collection('inputs').doc('input3').set({value: '新プレス機の導入'});
//
//     citiesRef.doc('IOP').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'inner_outer_pour',
//         physicalName: 'インナーとアウターの流し込み',
//         items_count: 1,
//         group: 3,
//         sequence: 3,
//     });
//     citiesRef.doc('IOP').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('IOP').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//
//     citiesRef.doc('OP').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'outer_painting',
//         physicalName: 'アウターの塗装',
//         items_count: 1,
//         group: 3,
//         sequence: 4,
//     });
//     citiesRef.doc('OP').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('OP').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('IOS').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'inner_outer_set',
//         physicalName: 'インナーとRFのセット',
//         items_count: 1,
//         group: 3,
//         sequence: 5,
//     });
//     citiesRef.doc('IOS').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('IOS').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('IRW').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'inner_RF_welding',
//         physicalName: 'インナーとRFの溶接',
//         items_count: 1,
//         group: 3,
//         sequence: 6,
//     });
//     citiesRef.doc('IRW').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('IRW').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('IRA').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'inner_RF_adhesive',
//         physicalName: 'インナーとRFの接着',
//         items_count: 1,
//         group: 3,
//         sequence: 7,
//     });
//     citiesRef.doc('IRA').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('IRA').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('IRJ').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'inner_RF_joint',
//         physicalName: 'インナーとRFのリベット接合',
//         items_count: 1,
//         group: 3,
//         sequence: 8,
//     });
//     citiesRef.doc('IRJ').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('IRJ').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('IRS').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'inner_RF_set',
//         physicalName: 'アウターセット',
//         items_count: 1,
//         group: 3,
//         sequence: 9,
//     });
//     citiesRef.doc('IRS').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('IRS').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('OS').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'outer_set',
//         physicalName: 'アウターへの接着剤塗布',
//         items_count: 1,
//         group: 3,
//         sequence: 10,
//     });
//     citiesRef.doc('OS').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('OS').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('OAA').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'outer_adhesive_application',
//         physicalName: 'インナーのかぶせ',
//         items_count: 1,
//         group: 3,
//         sequence: 11,
//     });
//     citiesRef.doc('OAA').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('OAA').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('IC').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'inner_cover',
//         physicalName: 'アウター曲げ',
//         items_count: 1,
//         group: 3,
//         sequence: 12,
//     });
//     citiesRef.doc('IC').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('IC').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
//     citiesRef.doc('OB').set({
//         department: 'IndustrialTechnology',
//         logicalName: 'outer_bending',
//         physicalName: 'アウターの加圧',
//         items_count: 1,
//         group: 3,
//         sequence: 13,
//     });
//     citiesRef.doc('OB').collection('inputs').doc('input1').set({value: '新設'});
//     citiesRef.doc('OB').collection('inputs').doc('input2').set({value: '既存設備の応用'});
//
// }

function createCalendar() {
    teams.map((team) => {
        deps.map((dep) => {
            firestore.collection('remainingPeriod').doc(team.logicalName).collection(dep.logicalName).doc('value').set({
                remainingPeriod: 24,
            });
        })
    })
}

function createObtAddInfo() {
    teams.map((team) => {
        deps.map((dep) => {
            addInfos.map((addInfo)=> {
                if(dep.logicalName === addInfo.department) {
                    addInfo.addInfo.map((data)=>{
                        firestore.collection('ObtAddInfo').doc(team.logicalName).collection(dep.logicalName).doc(data.id).set({
                            Obtained: false
                        });
                    })
                }
            })
        })
    })
}


export default init;