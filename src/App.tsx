import React, {useEffect, useState} from 'react';

import Login from "./components/Login";
import TopMenuControl from "./components/TopMenuControl";
import SideMenuControl from "./components/SideMenuControl";
import ObtainedAdditionalInformation from "./components/ObtainedAdditionalInformation";
import Chat from "./components/Chat";
import Remaining from "./components/Remaining";

import './App.css';
import './destyle.css';
import debug from "./index";
import {firestore} from "./firebase";
import deps from "./data/department.json";

export interface userStateProps {
    name: string
    password: string
    team: string
    department: string
}

function App() {

    const [userState, setUserState] = useState<userStateProps>({
        name: '',
        password: '',
        team: 'Vermilion',
        department: 'PlanningAndEvaluation'
    });
    const [auth, setAuth] = useState<boolean>(false);
    const [remainingPeriod, setRemainingPeriod] = useState<number>(0);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        e.persist();
        const name = e.target.name;
        const value = e.target.value;
        setUserState((userState) => {
            return {...userState, [name]: value};
        });
    }

    const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setSelectDep(userState.department);
        setAuth(true);
    }

    const [selectDep, setSelectDep] = useState<string>('');

    const onButtonClick2: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        deps.map((p) => {
            if (p.logicalName === e.currentTarget.value) {
                setSelectDep(p.logicalName);
            }
        });
    };

    useEffect(() => {
        firestore.collection('remainingPeriod').doc(userState.team).collection(userState.department).onSnapshot((docs) => {
            docs.forEach(doc => {
                setRemainingPeriod(doc.data().remainingPeriod);
            });
        });
    }, [userState]);

    return (
        <div className="App">
            {!auth && <Login handleInputChange={handleInputChange} onButtonClick={onButtonClick}/>}
            {auth &&
            <div>
                <TopMenuControl userTeam={userState.team} userDep={userState.department} userName={userState.name}
                                selectDep={selectDep} onButtonClick2={onButtonClick2}/>
                <SideMenuControl userTeam={userState.team} userDep={userState.department}
                                 remainingPeriod={remainingPeriod} selectDep={selectDep}/>
                <div className="container">
                    <Chat {...userState}/>
                    <ObtainedAdditionalInformation/>
                    <Remaining userTeam={userState.team} userName={userState.name} remainingPeriod={remainingPeriod}/>
                </div>
            </div>
            }
        </div>
    );
}

export default App;
