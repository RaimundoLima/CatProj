import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,

    IonFabButton,

    IonButton,
    IonText,

    IonPopover
} from '@ionic/react';
import React, { useState, useEffect } from 'react';

import "./style.css"
import Camera from '../../components/Camera';
import PopOver from '../../components/PopOver';
import { Capacitor } from '@capacitor/core';



import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import CatApi from '../../service/CatApi';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';

const Photo: React.FC = () => {

    const fileChooser = new FileChooser()
    const filePath = new FilePath()


    const galery = () => {
        fileChooser.open()
            .then(async uri => {

                const url=Capacitor.convertFileSrc(uri)
                const blob = await fetch(url).then(r => r.blob());

                //const file = new File([blob], "tantofaz.png")

                const b: any = blob;
                //A Blob() is almost a File() - it's just missing the two properties below which we will add
                b.lastModifiedDate = new Date(Date.now());
                b.name = "tantofaz.png";

                const file: File = b;
                //Cast to a File() type


                console.log("DEBUUUGGG")
                console.log(file.name)
                console.log(file.type)
                console.log(file.size)
                console.log(file.lastModified)
                console.log("DEBUUUGGG")

                sendImage(file)
                })
                .catch(e => console.log(e));
                }

                const [cameraOn, setCamera] = useState(false);


    const changeCamera = () => {
        setCamera(!cameraOn);
    }

    const sendImage = async (img: File) => {

        setShowPopover(true)
        const api = new CatApi();

        const networkInterface = new NetworkInterface()
        const adress = await networkInterface.getWiFiIPAddress()

        setPopOverRequest(api.SendImage(img, `User-${1}`))//xklm1

    }
    const [popOverRequest, setPopOverRequest] = useState(new Promise(() => { }))



    const [showPopover, setShowPopover] = useState(false);


    return (
        <IonPage className="has-header">
            {
                (!cameraOn
                    ?
                    <IonContent >
                        <IonPopover
                            isOpen={showPopover}
                            cssClass='my-custom-class'
                            onDidDismiss={e => setShowPopover(false)}
                        >
                            <PopOver promise={popOverRequest} />
                        </IonPopover>
                        <IonButton onClick={() => setShowPopover(true)}>Show Popover</IonButton>
                        <IonText >
                            <h3 className="paddingText">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                            </h3>
                        </IonText>
                        <IonButton onClick={changeCamera} className="marginButton" color="primary" expand="block" size="large" fill="solid" shape="round">
                            <IonTitle>TAKE A PHOTO</IonTitle>
                        </IonButton>

                        <IonButton onClick={galery} className="marginButton" color="primary" expand="block" size="large" fill="solid" shape="round">
                            <IonTitle>Galeeria</IonTitle>
                        </IonButton>
                    </IonContent>
                    :
                    <Camera sendImage={sendImage} cameraOff={changeCamera} />
                )
            }
        </IonPage>
    );
};
export default Photo;