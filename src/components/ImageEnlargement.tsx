import React from 'react';

import './ImageEnlargement.css';

import debug from "../index";

type Props = {
    imageName: string;
}

const ImageEnlargement: React.FC<Props> = (props) => {

    debug(props.imageName,'n');

    return (
        <div className="ImageEnlargement">
            <img alt="" src={require(`../img/${props.imageName}.jpeg`)}/>
        </div>
    );
}

export default ImageEnlargement;