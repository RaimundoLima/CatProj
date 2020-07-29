import React, { Component } from 'react';
import './style.css';
import { IonProgressBar, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';

import CatApi from '../../service/CatApi';

import { NetworkInterface } from '@ionic-native/network-interface/ngx';

import VizSensor from 'react-visibility-sensor';


class TimeLine extends Component {


    state = {
        cats: [{
            id: "",
            url: ""
        }]
    }

    componentDidMount() {
        this.loadCats();
    }

    loadCats = async () => {
        const api = new CatApi();

        this.setState({ cats: await api.ListImages() });
        console.log(this.state.cats)
    }

    favImage = async (catID: string) => {
        const api = new CatApi();

        const networkInterface = new NetworkInterface()
        networkInterface.getWiFiIPAddress()
            .then(address => api.FavImage(catID, `User-${address.ip}`))//xklm1
            .catch(error => console.error(`Unable to get IP: ${error}`))


    }
    reload = async () => {
        this.count = 0;
        this.loadCats();
    }

    appendCats = async () => {
        const api = new CatApi();
        const array = this.state.cats
        array.push(...await api.ListImages())
        this.setState({ cats: array });
        console.log(this.state.cats)
    }

    visibleChange = () => {

        const antigoCount = this.count
        this.count++
        setTimeout(() => {
            if (this.count > antigoCount) {
                this.appendCats()
                this.count = 0
            }
        }, 1000)


    }
    count = 0

    render() {

        let timeout: NodeJS.Timeout;
        let lastTap = 0;
        const doubleTap = (catID: string) => {//gambi
            console.log()
            let currentTime = new Date().getTime();
            let tapLength = currentTime - lastTap;
            clearTimeout(timeout);
            if (tapLength < 500 && tapLength > 0) {
                this.favImage(catID)
            }
            lastTap = currentTime;
        }



        return (
            <div className="has-header" id="timeline">

                {

                    (this.state.cats.length > 1
                        ?
                        this.state.cats.map(card => (

                            <div className="card" color="">
                                <img alt="cat" onTouchEnd={() => doubleTap(card.id)} onDoubleClick={() => this.favImage(card.id)} key={card.id} src={card.url} />
                            </div>

                        ))

                        :
                        <div className="load">
                            <h1>Carregando</h1>
                            <IonProgressBar type="indeterminate"></IonProgressBar><br />
                        </div>
                    )

                }
                {(this.state.cats.length != 1 && this.state.cats[0].id != null
                    ?
                    <VizSensor onChange={this.visibleChange}>
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
    }
};

export default TimeLine;
