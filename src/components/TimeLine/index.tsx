import React, { Component, useState, useEffect } from 'react';
import './style.css';
import { IonProgressBar, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';

import CatApi from '../../service/CatApi';

import { NetworkInterface } from '@ionic-native/network-interface/ngx';

import VizSensor from 'react-visibility-sensor';


const TimeLine: React.FC = () => {

    const [cats, setCats] = useState([{
        id: "",
        url: ""
    }])


    useEffect(() => {
        loadCats();
    },[])


    const loadCats = async () => {
        const api = new CatApi();

        setCats(await api.ListImages());
        console.log(cats)
    }


    const reload = async () => {
        loadCats();
    }

    const appendCats = async () => {
        const api = new CatApi();
        setCats([...cats,... await api.ListImages()]);
        console.log(cats)
    }

    const favImage = async (catID: string) => {
        const api = new CatApi();

        const networkInterface = new NetworkInterface()
        networkInterface.getWiFiIPAddress()
            .then(address => api.FavImage(catID, `User-${address.ip}`))//xklm1
            .catch(error => console.error(`Unable to get IP: ${error}`))
    }

    let timeOut: NodeJS.Timeout | null = null;
    const visibleChange = () => {
        if (timeOut == null) {
            appendCats()
            timeOut = setTimeout(() => {
                timeOut = null
            }, 5000)
        }

    }

    let timeout: NodeJS.Timeout;
    let lastTap = 0;
    const doubleTap = (catID: string) => {
        console.log()
        let currentTime = new Date().getTime();
        let tapLength = currentTime - lastTap;
        clearTimeout(timeout);
        if (tapLength < 500 && tapLength > 0) {
            favImage(catID)
        }
        lastTap = currentTime;
    }


    return (
        <div id="timeline">

            {

                (cats.length > 1
                    ?
                    cats.map(card => (

                        <div className="card" color="">
                            <img alt="cat" onTouchEnd={() => doubleTap(card.id)} onDoubleClick={() => favImage(card.id)} key={card.id} src={card.url} />
                        </div>

                    ))

                    :
                    <div className="load">
                        <h1>Carregando</h1>
                        <IonProgressBar type="indeterminate"></IonProgressBar><br />
                    </div>
                )

            }
            {(cats.length != 1 && cats[0].id != null
                ?
                <VizSensor onChange={visibleChange}>
                    <IonInfiniteScroll threshold="100px" >
                        <div className="load2">
                            <h1>Carregando</h1>
                            <IonProgressBar type="indeterminate"></IonProgressBar><br />
                        </div>
                    </IonInfiniteScroll>
                </VizSensor>
                : null
            )}


        </div>
    );
};

export default TimeLine;
