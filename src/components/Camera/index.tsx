import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import React, { Component } from 'react';
import './style.css';
import { IonFab, IonFabButton, IonContent } from '@ionic/react';






class Camera extends Component {
    render() {

        // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
        const cameraPreviewOpts: CameraPreviewOptions = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height/2,
            camera: 'back',
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
            quality: 85
        }
        var picture
        // take a picture
        const takePhoto = () => {
            cameraPreview.takePicture(pictureOpts).then((imageData) => {
                picture = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
                console.log(err);
                picture = 'assets/img/test.jpg';
            });
        }

        // take a snap shot
        const takeSnap = () => {
            cameraPreview.takeSnapshot(pictureOpts).then((imageData) => {
                picture = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
                console.log(err);
                picture = 'assets/img/test.jpg';
            });
        }


        // Switch camera
        const switchCamera = () => {
            cameraPreview.switchCamera();
        }
        
        // set color effect to negative
        cameraPreview.setColorEffect('negative');

        // Stop the camera preview
        const stopCamera = () => {
            cameraPreview.stopCamera();
        }

        cameraPreview.onBackButton();

        const con = () => {
            console.log(cameraPreview)
        }

        return (
            <IonContent className="transparente">
            <div>
                <IonFab vertical="top" horizontal="end" slot="fixed">
                    <IonFabButton onClick={startCamera}>
                        func1 - start camera
                </IonFabButton>
                </IonFab>


                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={takePhoto}>
                        func2 -takePhoto
            </IonFabButton>
                </IonFab>


                <IonFab className="z" vertical="top" horizontal="start" slot="fixed">
                    <IonFabButton onClick={takeSnap}>
                        func3- takeSnap
            </IonFabButton>
                </IonFab>


                <IonFab className="z" vertical="bottom" horizontal="start" slot="fixed">
                        <IonFabButton onClick={con}>
                            func6
            </IonFabButton>
                </IonFab>


                <IonFab className="z" vertical="center" horizontal="start" slot="fixed">
                        <IonFabButton onClick={stopCamera}>
                        func5
            </IonFabButton>
                </IonFab>


                <IonFab className="z" vertical="center" horizontal="end" slot="fixed">
                        <IonFabButton onClick={con}>
                        func6
            </IonFabButton>
                </IonFab>
                </div>
            </IonContent>
        )
    }
}

export default Camera;