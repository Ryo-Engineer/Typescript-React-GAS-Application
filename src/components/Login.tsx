import React, {useEffect, useState} from 'react';

import './Login.css';

import depList from '../data/department.json'
import teamList from '../data/team.json'


type Props = {
    handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
    onButtonClick: React.MouseEventHandler<HTMLButtonElement>
}

const Login: React.FC<Props> = props => {

    const [depOptList, setDepOptList] = useState();
    const [teamOptList, setTeamOptList] = useState();

    useEffect(() => {

        const depOptList: any = [];
        depList.map((dep, i) => {
            depOptList.push(
                <option key={i} value={dep.logicalName}>{dep.physicalName}</option>
            );
        });
        setDepOptList(depOptList);

        const teamOptList: any = [];
        teamList.map((team, i) => {
            teamOptList.push(
                <option key={i} value={team.logicalName}>{team.logicalName}</option>
            );
        });
        setTeamOptList(teamOptList);

    }, []);

    return (
        <div className="Login">
            <div className="title">One Professionals</div>
            <table>
                <tbody>
                <tr>
                    <td>ユーザー名</td>
                    <td><input type="text" name="name" onChange={props.handleInputChange}/></td>
                </tr>
                <tr>
                    <td>パスワード</td>
                    <td><input type="text" name="password" onChange={props.handleInputChange}/></td>
                </tr>
                <tr>
                    <td>チーム</td>
                    <td><select name="team" onChange={props.handleInputChange}>{teamOptList}</select></td>
                </tr>
                <tr>
                    <td>部署</td>
                    <td><select name="department" onChange={props.handleInputChange}>{depOptList}</select></td>
                </tr>
                </tbody>
            </table>
            <button onClick={props.onButtonClick}>login</button>

        </div>
    );
}

export default Login;