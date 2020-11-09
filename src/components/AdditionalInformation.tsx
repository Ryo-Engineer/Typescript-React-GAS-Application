import React, {useEffect, useState} from 'react';
import {firestore} from "../firebase";
import swal from 'sweetalert';

import ImageEnlargement from "./ImageEnlargement";
import {Props} from './SideMenuControl';

import additionalInformation from '../data/additionalInformation.json';

import './AdditionalInformation.css';

import debug from "../index";


export interface addInfoState {
    id: string
    imageName: string
    title: string
}

// interface obtAddInfoState{
//     [key:string]:any
// }


const AdditionalInformation: React.FC<Props> = (prop) => {

    const [imgEnlargeState, serImgEnlargeState] = useState<boolean>(false);
    const [addInfoState, setAddInfoState] = useState<addInfoState>({id: '', imageName: '', title: ''});
    // const [liList, setLiList] = useState();


    const imageEnlargement = (addInfo: addInfoState) => {
        setAddInfoState(addInfo);
        swal({
            title: `「${addInfo.title}」を取得しますか?`,
            text: "残り時間を1ヶ月使用します",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    const remainingPeriod: number = prop.remainingPeriod - 1;
                    debug(remainingPeriod, 'n');
                    firestore.collection('remainingPeriod').doc(prop.userTeam).collection(prop.userDep).doc('value').set({
                        remainingPeriod: remainingPeriod
                    });
                    firestore.collection('ObtAddInfo').doc(prop.userTeam).collection(prop.userDep).doc(addInfo.id).set({
                        Obtained: true
                    });
                    swal("追加情報を取得しました!", "残り時間を1ヶ月使用しました", "success");
                    serImgEnlargeState(true);
                }
            });
    };

    // useEffect(() => {
    //     const liList: any = [];
    //     additionalInformation.map((data) => {
    //             if (data.department === prop.selectDep) {
    //                 data.addInfo.map((addInfo: addInfoState, i) => {
    //                     debug(addInfo.id, 's')
    //                     liList.push(
    //                         <li key={i} onClick={() => imageEnlargement(addInfo)}>
    //                             <div className="id">【{addInfo.id}】</div>
    //                             <div className="title">{addInfo.title}</div>
    //                         </li>
    //                     )
    //
    //                     // firestore.collection('ObtAddInfo').doc(prop.userTeam).collection(prop.userDep).doc(addInfo.id).onSnapshot(
    //                     //     (snapshot )=> {
    //                     //
    //                     //             // if (addInfo.id === doc.id) {
    //                     //             //     debug(prop.userTeam, 's')
    //                     //             //     debug(prop.userDep, 's')
    //                     //             //     debug(doc.id, 's')
    //                     //             //     debug(addInfo.id, 's')
    //                     //             //     debug(doc.data(), 's')
    //                     //             // }
    //                     //
    //                     //             debug(snapshot.data().Obtained, 'a')
    //                     //             const hoge:Object = snapshot.data()
    //                     //                 liList.push(
    //                     //                     <li key={i} onClick={() => imageEnlargement(addInfo)}>
    //                     //                         <div className="id">【{addInfo.id}】</div>
    //                     //                         <div className="title">{addInfo.title}</div>
    //                     //                     </li>
    //                     //                 )
    //                     //
    //                     //
    //                     //     }
    //                     //     )
    //
    //                 })
    //
    //
    //                 // })
    //             }
    //         setLiList(liList)
    //         }
    //     )
    // }, []);


    // useEffect(() => {
    const liList: any = [];
    additionalInformation.map((data) => {
        if (data.department === prop.selectDep) {
            data.addInfo.map((addInfo: addInfoState, i) => {
                debug(addInfo.id, 'n')
                liList.push(
                    <li key={i} onClick={() => imageEnlargement(addInfo)}>
                        <div className="id">【{addInfo.id}】</div>
                        <div className="title">{addInfo.title}</div>
                    </li>
                )
            })
        }
    })
    // setLiList(liList)
    // }, []);

// useEffect(() => {
// firestore.collection('ObtainedAdditionalInformation').doc(prop.userTeam).collection(prop.userDep).doc(addInfo.id).onSnapshot(onSnapshot
// firestore.collection('ObtainedAdditionalInformation').doc(prop.userTeam).getCollections()getCollections
// firestore.collection('ObtainedAdditionalInformation').doc(prop.userTeam).getCollections().then(collections => {
//     collections.forEach(collection => {
//
//             setObtAddInfoState(data.);
//             debug(data.data());
//         console.log('Found subcollection with id:', collection.id);
//     });
//
//
//     });
// }, []);

// data.addInfo.map((addInfo: addInfoState, i) => {
//     if (data.department === "PlanningAndEvaluation") {
//         liList.push(<li key={i} onClick={() => imageEnlargement(addInfo)}>
//             <div className="id">【{addInfo.id}】</div>
//             <div className="title">{addInfo.title}</div>
//         </li>)
//     }else if(data.department === "Design"){
//         liList.push(<li key={i} onClick={() => imageEnlargement(addInfo)}>
//             <div className="id">【{addInfo.id}】</div>
//             <div className="title">{addInfo.title}</div>
//         </li>)
//     }else if(data.department === "IndustrialTechnology"){
//         liList.push(<li key={i} onClick={() => imageEnlargement(addInfo)}>
//             <div className="id">【{addInfo.id}】</div>
//             <div className="title">{addInfo.title}</div>
//         </li>)
//     }
// })


    return (
        <div className="AdditionalInformation">
            <ul>
                {liList}
            </ul>
            {(imgEnlargeState) && <ImageEnlargement imageName={addInfoState.imageName}/>}
            {(imgEnlargeState) && <button onClick={() => serImgEnlargeState(false)}>× 閉じる</button>}
        </div>
    );
}

export default AdditionalInformation;

