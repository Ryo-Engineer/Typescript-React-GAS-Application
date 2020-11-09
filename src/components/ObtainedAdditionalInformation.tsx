import React, {useState} from 'react';

import additional_information from '../data/additionalInformation.json'
import {addInfoState} from './AdditionalInformation'


import './ObtainedAdditionalInformation.css'
import debug from "../index";
import ImageEnlargement from "./ImageEnlargement";



const ObtainedAdditionalInformation: React.FC = () => {

    const [imgEnlargeState, serImgEnlargeState] = useState<boolean>(false);
    const [addInfoState, setAddInfoState] = useState<addInfoState>({id: '', imageName: '', title: ''});


    const imageEnlargement = (addInfo: addInfoState) => {
        setAddInfoState(addInfo);
        serImgEnlargeState(true);
    };


    const liList: any = [];
    additional_information.map((data) => {
        if (data.department === "PlanningAndEvaluation") {
            data.addInfo.map((addInfo: addInfoState, i) => {
                liList.push(<li key={i} className="obtained" onClick={() => imageEnlargement(addInfo)}>
                    <div className="id">【{addInfo.id}】</div>
                    <div className="title">{addInfo.title}</div>
                </li>)
                debug(addInfo.id, 'n');
            })
        }
    })

        return (
        <div className="ObtainedAdditionalInformation">
            <ul>
                <li className="top">獲得済み<br/>追加情報</li>
                {liList}
            </ul>
            {(imgEnlargeState) && <ImageEnlargement imageName={addInfoState.imageName}/>}
            {(imgEnlargeState) && <button onClick={() => serImgEnlargeState(false)}>× 閉じる</button>}
        </div>
    );
}

export default ObtainedAdditionalInformation;

