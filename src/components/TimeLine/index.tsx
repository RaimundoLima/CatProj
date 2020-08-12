import React, { Component, useState, useEffect } from 'react';
import './style.css';
import { IonProgressBar, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';

import CatApi from '../../service/CatApi';

import { NetworkInterface } from '@ionic-native/network-interface/ngx';

import VizSensor from 'react-visibility-sensor';


const TimeLine: React.FC<{
    filters: {
        breed: string,
        category: string,
        type: string
    },
    perfil: boolean
}> = (props) => {

    const [cats, setCats] = useState([{
        id: "",
        url: ""
    }])


    useEffect(() => {
        loadCats();
    }, [])


    const loadCats = async () => {
        const api = new CatApi();
        if (props.perfil) {
            const ip = await getIp()
            setCats(await api.ListMyImages(ip));
        } else
        {
            setCats(await api.ListImages(props.filters));
        }
        console.log(cats)
    }


    const reload = async () => {
        loadCats();
    }

    const appendCats = async () => {
        const api = new CatApi();

        if (props.perfil) {
            const ip= await getIp()
            setCats([...cats, ... await api.ListMyImages(ip)]);
        } else {
            setCats([...cats, ... await api.ListImages(props.filters)]);
        }


        console.log(cats)
    }

    const favImage = async (catID: string) => {
        const api = new CatApi();

        const ip =await  getIp()

        api.FavImage(catID, `User-${ip}`)//xklm1
    }

    const getIp = async () => {
        const networkInterface = new NetworkInterface()
        const adress = await networkInterface.getWiFiIPAddress()
        console.log(`IP : ${adress.ip} `)
        return adress.ip
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
            {(cats.length != 1 
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
