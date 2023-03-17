import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import imagenDefaultRoute from "/soccer.ico"
const firebaseConfig = {
    apiKey: "AIzaSyCiLJwqM24SKeCi2cdoQ36meFmaqJwICXA",
    authDomain: "devlights-reservacanchas.firebaseapp.com",
    projectId: "devlights-reservacanchas",
    storageBucket: "devlights-reservacanchas.appspot.com",
    messagingSenderId: "173467322937",
    appId: "1:173467322937:web:0324e1c163397ed5e95be8"
  };
  
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);


export function ImagenYrecursos() {
    const [modify, setModify] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleUpload = () => {
    const storageRef = ref(storage, selectedFile.name);
    const uploadTask = uploadBytes(storageRef, selectedFile, metadata)
    .then((snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        getDownloadURL(storageRef).then((url) => {
            console.log("Seteo de URL")
            setDownloadURL(url)
            setModify(false)
        })
    })
  };


  return (
    <div className="flex flex-wrap gap-4 flex-col items-center">
      <div className="rounded-lg border border-gray-300 w-[10vw] h-[20vh] p-2 flex items-center justify-center bg-gray-50 shadow-lg">
      {downloadURL ? (
        <img
          src={downloadURL}
          className="w-full h-full object-cover"
        />
        ):(
        <img src={imagenDefaultRoute}
            className="w-full h-full object-cover"
        />
        )}
      </div>
      {modify === false ? (
        <button className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded-lg shadow-md mt-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-sans font-medium" onClick={()=>setModify(!modify)}>
        Modificar Imagen
      </button>
      ):(
        <button className="font-bold mt-5  rounded-lg px-6 py-3 bg-gradient-to-tr from-gray-500 to-gray-700 hover:to-gray-500 text-white" onClick={()=>setModify(!modify)}>
        Cancelar
        </button>
      )

      }
        {modify &&
        <div>
            
            <form className="flex justify-center flex-wrap w-full">
            <h1>Subir imagen</h1>
                <div className=" flex w-full justify-center">
                    
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="flex w-100">
                    <button type="button" onClick={handleUpload}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded-lg shadow-md mt-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-sans font-medium">
                        Subir imagen
                    </button>
                </div>
                {uploadProgress > 0 && (
                <div>
                    <progress value={uploadProgress} max="100" />
                </div>
                )}
                
            </form>
        </div>
        }
    </div>
  );
}
