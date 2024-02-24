import { useState } from 'react'
import dummyQRimg from './assets/dummyImg.png'
import './App.css'

function App() {
  const[img,setImg]=useState(dummyQRimg);
  const[loading,setLoading]=useState(false);
  const[qrData,setQrData]=useState("");
  const[qrSize,setQrSize]=useState("");
  async function generateQR(){
    try{
    const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
    setImg(url);
    }catch(error){
      console.error("Error generating QR code",error);
    }finally{
      setLoading(false);
    }
  }
function downloadQR(){
  fetch(img)
  .then((response) => response.blob())
  .then((blob)=>{
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="qrcode.png"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
}
  return(
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} className='qr-code-image'/>}
      <div>
            <label htmlFor="dataInput" className="input-label">
                Data for QR code:
            </label>
            <input type="text" value={qrData} id="dataInput" placeholder="Enter data for qr code" onChange={e=>setQrData(e.target.value)} />
            <label htmlFor="sizeInput" className="input-label">
                Image size(eg.150px)
            </label>
            <input type="text" value={qrSize} id="sizeInput" placeholder="enter size" onChange={e=>setQrSize(e.target.value)} />
            <button className="generate-button" onClick={generateQR} disabled={loading}>Generate QR code</button>
            <button className="download-button" onClick={downloadQR}>Download QR code</button>
        </div>
        <p className='footer'>Designed by
        <a href="Manfred Nelvin"> Manfred Nelvin</a> </p>
    </div>
);
}

export default App
