import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import React, { Component } from 'react';
import './style.css';






class Camera extends Component {
    render() {

        // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
        const cameraPreviewOpts: CameraPreviewOptions = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: 'rear',
            tapPhoto: true,
            previewDrag: true,
            toBack: true,
            alpha: 1
        }

        // start camera
        const cameraPreview =  new CameraPreview();


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
        cameraPreview.takePicture(pictureOpts).then((imageData) => {
            picture = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log(err);
            picture = 'assets/img/test.jpg';
        });

        // take a snap shot
        cameraPreview.takeSnapshot(pictureOpts).then((imageData) => {
            picture = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log(err);
            picture = 'assets/img/test.jpg';
        });


        // Switch camera
        cameraPreview.switchCamera();

        // set color effect to negative
        cameraPreview.setColorEffect('negative');

        // Stop the camera preview
        cameraPreview.stopCamera();

        return (
            <div>
                <span onClick={startCamera}>func 1</span>
            </div>
            )
    }
}

export default Camera;