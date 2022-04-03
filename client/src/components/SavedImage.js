import React, { useState, useEffect } from 'react';
import axios from 'axios';
// baller save -> https://stackoverflow.com/questions/44611047/get-image-from-server-and-preview-it-on-client
const SavedImage = (data) => {
    const [source, setSource] = useState("");

    async function UnusedGetImage(){
        let res = await axios.get("/api/getSavedImage/" + data.name, {
            responseType: 'arraybuffer'
        })
        .then(res => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
              ),
            );
            setSource("data:;base64," + base64);
        });
    }

    async function getImage() {
        await axios.get("/api/getAppIcon/" + data.id)
        .then(res => {
            setSource(res.data)
        })
    }

    useEffect(() =>  {
        getImage();
    });

    return (
        <img src={source} className='homecard'/>
    );
}
export default SavedImage;