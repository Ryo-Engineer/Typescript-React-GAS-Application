import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BasicInformation.css';


import basicInformation from "../data/basicInformation.json";

interface Props {
    selectDep: string
}

interface basicInfoState {
    imageName: string
}

const BasicInformation: React.FC<Props> = (prop) => {


    // const [basicInfoState, setAddInfoState] = useState<basicInfoState>({id: '', imageName: '', title: ''});
    
    const divList: any = [];
    basicInformation.map((data) => {
        if (data.department === 'Common') {
            data.basicInfo.map((basicInfo: basicInfoState, i) => {
                divList.push(
                    <div key={i}>
                        <img alt="" src={require(`../img/${basicInfo.imageName}.jpeg`)}/>
                    </div>
                )
            })
        }
        if (data.department === prop.selectDep) {
            data.basicInfo.map((basicInfo: basicInfoState, i) => {
                divList.push(
                    <div key={i}>
                        <img alt="" src={require(`../img/${basicInfo.imageName}.jpeg`)}/>
                    </div>
                )
            })
        }
    })
    
    
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="BasicInformation">
            <Slider {...settings}>
                {divList}
            </Slider>
        </div>
    );
}

export default BasicInformation;

