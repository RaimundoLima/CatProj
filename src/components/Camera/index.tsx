import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import React, { Component, useEffect } from 'react';
import './style.css';
import { IonFab, IonFabButton, IonContent, IonPage, IonBackButton, IonIcon } from '@ionic/react';
import { BackButtonEvent } from '@ionic/core';
import { cameraReverse, close } from 'ionicons/icons';





const Camera: React.FC<{ cameraOff: Function, sendImage: Function }> = (props) => {

    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    const cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height * 0.80,
        camera: 'rear',
        tapPhoto: true,
        previewDrag: true,
        toBack: true,
        alpha: 0.5
    }

    // start camera
    var cameraPreview = new CameraPreview();


    const startCamera = () => {
        cameraPreview.startCamera(cameraPreviewOpts).then(
            (res) => {
                console.log(res)
            },
            (err) => {
                console.log(err)
            });
    }


    // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
        width: 1280,
        height: 1280,
        quality: 100
    }

    // take a picture
    const takePhoto = () => {
        cameraPreview.takePicture(pictureOpts).then(async (imageData) => {
            const picture = 'data:image/jpeg;base64,' + imageData;

            const blob = await fetch(picture).then(r => r.blob());

            //const file = new File([blob], "tantofazCamera.png")

            const b: any = blob;
            //A Blob() is almost a File() - it's just missing the two properties below which we will add
            b.lastModifiedDate = new Date();
            b.name = "tantofazCamera.png";

            const file: File = b;

            props.sendImage(file)
            
            cameraExit()

        }, (err) => {
            console.log(err);
        });
    }


    // Switch camera
    const switchCamera = () => {
        cameraPreview.switchCamera();
    }

    // set color effect to negative
    //cameraPreview.setColorEffect('negative');

    // Stop the camera preview
    const stopCamera = () => {
        cameraPreview.stopCamera();
    }
    document.getElementById("root")?.addEventListener("backButton", () => {
        document.getElementById("root")?.removeEventListener("backButton", () => { })
        cameraExit()
    })

    useEffect(() => {

        return () => { cameraExit() }
    }, []);

    const cameraExit = () => {
        stopCamera()
        props.cameraOff()
    }

    useEffect(() => {
        console.log("camera iniciando")
        startCamera()
    }, [])

    return (
        <IonPage>

            <div className="cameraToolBar">
                <IonFab className="cameraBtn">
                    <IonFabButton onClick={cameraExit} >
                        <IonIcon icon={close}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonFab className="cameraBtn photoBtn">
                    <IonFabButton color="danger" onClick={takePhoto}>

                    </IonFabButton>
                </IonFab>
                <IonFab className="cameraBtn">
                    <IonFabButton onClick={switchCamera}>
                        <IonIcon icon={cameraReverse}></IonIcon>

                    </IonFabButton>
                </IonFab>
            </div>
        </IonPage>
    )
}

export default Camera;