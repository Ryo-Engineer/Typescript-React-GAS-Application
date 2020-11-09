import React, {useEffect, useState} from 'react';
import {firestore} from "../firebase";

import BasicInformation from "./BasicInformation";
import AdditionalInformation from './AdditionalInformation';
import TrialAndProduction from './TrialAndProduction';
import Production from "./Production";

import './SideMenuControl.css';

import debug from "../index";

export interface Props {
    userTeam: string
    userDep: string
    remainingPeriod: number
    selectDep: string
}

type PageProps = {
    documentID: string,
    logicalName: string,
    physicalName: string,
    showing: boolean,
    group: number,
}


const SideMenuControl: React.FC<Props> = (prop) => {
    const [pages, setPages] = useState<PageProps[]>([]);
    const [page, setPage] = useState<PageProps>({
        documentID: 'BI',
        logicalName: '',
        physicalName: '',
        showing: false,
        group: 0
    });

    const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        pages.forEach((p) => {
            if (p.documentID === e.currentTarget.value) {
                setPage(p);
            }
        });
    };

    const tabList: any = [];
    pages.forEach((p, i) => {
        let selectedId: string = '';
        if (page.documentID === p.documentID) {
            selectedId = 'selected';
        }
        if (p.group === 1) {
            tabList.push(
                <li key={i} id={selectedId} className={p.documentID}>
                    <button onClick={onButtonClick} value={p.documentID}>{p.physicalName}</button>
                </li>
            );
        }
    });

    const buttonList: any = [];
    pages.forEach((p, i) => {
        if (p.group === 2) {
            buttonList.push(
                <li key={i}>
                    <button onClick={onButtonClick} value={p.documentID}>{p.physicalName}</button>
                </li>
            );
        }
    });

    useEffect(() => {
        firestore.collection('pages').orderBy('sequence').onSnapshot((docs) => {
            const pageList: PageProps[] = [];
            docs.forEach(doc => {
                const pageList2: any = doc.data();
                pageList2['documentID'] = doc.id;
                pageList.push(pageList2 as PageProps);
            });
            setPages(pageList);
        })
    }, []);

    // return (
    //     <div className="SideMenuControl">
    //         <div className='part1'>
    //             <dl className="tabList">
    //                 {tabList}
    //             </dl>
    //             <dl className="buttonList">
    //                 {buttonList}
    //             </dl>
    //         </div>
    //         <div className='part2'>
    //             {(page?.documentID === 'BI') && <BasicInformation selectDep={prop.selectDep}/>}
    //             {(page?.documentID === 'AI') && <AdditionalInformation userTeam={prop.userTeam} userDep={prop.userDep}
    //                                                                    remainingPeriod={prop.remainingPeriod}
    //                                                                    selectDep={prop.selectDep}/>}
    //             {(page?.documentID === 'TAP') && <TrialAndProduction userTeam={prop.userTeam} userDep={prop.userDep}
    //                                                                  remainingPeriod={prop.remainingPeriod}
    //                                                                  selectDep={prop.selectDep}/>}
    //
    //         </div>
    //     </div>
    // );

    return (
        <div className="SideMenuControl">
            <div className='part1'>
                <dl className="tabList">
                    {tabList}
                </dl>
                <button>ボタン1</button>
                <button>ボタン2</button>
                <button>ボタン3</button>
            </div>
            <div className='part2'>
                {(page?.documentID === 'BI') && <BasicInformation selectDep={prop.selectDep}/>}
                {(page?.documentID === 'AI') && <AdditionalInformation userTeam={prop.userTeam} userDep={prop.userDep}
                                                                       remainingPeriod={prop.remainingPeriod}
                                                                       selectDep={prop.selectDep}/>}
                {(page?.documentID === 'TAP') && <TrialAndProduction userTeam={prop.userTeam} userDep={prop.userDep}
                                                                     remainingPeriod={prop.remainingPeriod}
                                                                     selectDep={prop.selectDep}/>}
            </div>
        </div>
    );
}

export default SideMenuControl;