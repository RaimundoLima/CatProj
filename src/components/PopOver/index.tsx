import React, { useState, useEffect } from 'react';
import './style.css';
import { IonSpinner, IonButton } from '@ionic/react';

const PopOver: React.FC<{ promise: Promise<any> }> = (props) => {



    props.promise.then(() => {
        console.log("bbbbbbbbbbb")
        setMensagem(1)
    })

    props.promise.catch((e) => {

        console.log("aaaaaa")
        console.log(e)
       
        setMensagem(0)
    })

    const [menssagem, setMensagem] = useState(-1);

    useEffect(() => {
        console.log("reset component")
        console.log(props.promise)

        setMensagem(-1)
    },
        [props.promise])


    return (
        <div className="popBody" >
            {(function () {
                switch (menssagem) {
                    case (-1):
                        return (
                            <>
                                <div className="popContent">

                                    <IonSpinner name="crescent" />

                                </div>
                                <IonButton disabled={true} expand="full" fill="solid">OK</IonButton>
                            </>
                        )

                    case (0):
                        return (
                            <>
                                <div className="popContent">

                                    <h1 className="popText">ERROR</h1>

                                </div>
                                <IonButton  expand="full" fill="solid">OK</IonButton>
                            </>)
                    case (1):
                        return (
                            <>
                                <div className="popContent">

                                    <h1 className="popText">SEND</h1>

                                </div>
                                <IonButton expand="full" fill="solid">OK</IonButton>
                            </>)

                }

            })()}

        </div>
    )
}
export default PopOver