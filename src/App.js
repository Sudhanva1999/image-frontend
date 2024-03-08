import React, { useState } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import ImagePanel from './components/imagepanel/ImagePanel';
import axios from 'axios';
import ReactLoading from "react-loading";

const App = () => {
  const [image, setImage] = useState(null);
  const [histogramImg, setHistogram] = useState(null);
  const [currentImgName, setImageName] = useState(null);
  // const [done, setDone] = useState(true);

  const resizeCanvas = (canvasToResize) => {
    const parentElement = document.getElementById("img-panel");
    const parentWidth = parentElement.clientWidth;
    const parentHeight = parentElement.clientHeight;
    const aspectRatio = canvasToResize.width / canvasToResize.height;
    let newWidth, newHeight;
    if (aspectRatio > 1) {
        newWidth = parentWidth;
        newHeight = newWidth / aspectRatio;
    } else {
        newHeight = parentHeight;
        newWidth = newHeight * aspectRatio;
    }
    const desiredWidth = newWidth;
    const desiredHeight = newHeight;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = desiredWidth;
    tempCanvas.height = desiredHeight;
    tempCtx.drawImage(canvasToResize, 0, 0, desiredWidth, desiredHeight);
    return tempCanvas;
  };

  const resizeImage = (imgToResize) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const aspectRatio = imgToResize.width / imgToResize.height;
    const parentElement = document.getElementById("img-panel");
    const parentWidth = parentElement.clientWidth;
    const parentHeight = parentElement.clientHeight;
    let newWidth, newHeight;
    if (aspectRatio > 1) {
        newWidth = parentWidth;
        newHeight = newWidth / aspectRatio;
    } else {
        newHeight = parentHeight;
        newWidth = newHeight * aspectRatio;
    }
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(imgToResize, 0, 0, newWidth, newHeight);
    return canvas.toDataURL();
  }

  const createImageFromRGBArray = (imageRGBMat) => {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imageHeight = imageRGBMat.length;
    const imageWidth = imageRGBMat[0].length;
    canvas.width = imageWidth;
    canvas.height = imageHeight;
      for (let y = 0; y < imageHeight; y++) {
      for (let x = 0; x < imageWidth; x++) {
        const [red, green, blue] = imageRGBMat[y][x];
        const imageData = ctx.createImageData(1, 1);
        imageData.data[0] = red * 255; 
        imageData.data[1] = green * 255; 
        imageData.data[2] = blue * 255; 
        imageData.data[3] = 255; 
        ctx.putImageData(imageData, x, y);
      }
    }
  
    return canvas;
  };

  const createRGBArray = (imageData, imageWidth, imageHeight) => {
        const imageRGBMat = [];
        for (let y = 0; y < imageHeight; y++) {
          const row = [];
          for (let x = 0; x < imageWidth; x++) {
            const index = (y * imageWidth + x) * 4; 
            const red = imageData[index];
            const green = imageData[index + 1];
            const blue = imageData[index + 2];
            row.push([red / 255, green / 255, blue / 255]);
          }
          imageRGBMat.push(row);
        }
        return imageRGBMat;
    };

    const handleOperation = (operationType) => {
      const getImgData = () => {
        return new Promise(async (resolve, reject) => {
          try {
            // setDone(false);
            const response = await axios.get(`http://localhost:8080/operation${operationType}imageName=${currentImgName}`);
            resolve(response.data); 
          } catch (error) {
            console.error('Error getting data:', error);
            reject(error); 
          }
        });
      };
      
      getImgData()
        .then((data) => {
          setImage(resizeCanvas(createImageFromRGBArray(data.imageMat)).toDataURL());
          setHistogram(createImageFromRGBArray(data.histogramMat).toDataURL());
          // setDone(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    setImage(resizeImage(img));
                    setImageName("samplename");
                    const arrayCanvas = document.createElement('canvas');
                    const array_ctx = arrayCanvas.getContext('2d');
                    arrayCanvas.width = img.width;
                    arrayCanvas.height = img.height;
                    array_ctx.drawImage(img, 0, 0);
                    const imageData = array_ctx.getImageData(0, 0, img.width, img.height).data;
                    const imageWidth = img.width;
                    const imageHeight = img.height;
                    const rgbArray = createRGBArray(imageData, imageWidth, imageHeight);

                    const postData = () => {
                      return new Promise(async (resolve, reject) => {
                        try {
                          const response = await axios.post('http://localhost:8080/saveImage', {
                            imageName: "samplename",
                            imageRGBMat: rgbArray,
                            extension: "png"
                          });
                          console.log('Data posted successfully:', response.data);
                          resolve(response.data); 
                        } catch (error) {
                          console.error('Error posting data:', error);
                          reject(error); 
                        }
                      });
                    };
                    
                    postData()
                      .then((data) => {
                        return axios.get(`http://localhost:8080/getImageHistogram?imageId=${data}`);
                      })
                      .then((response) => {
                        console.log(response)
                        setHistogram(createImageFromRGBArray(response.data).toDataURL());
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                      });


                };
            };
    
            reader.readAsDataURL(file);
        }
    };
  
  return (
    <div className="App">
      <Header />
      <div className='bodyContainer'>
        <Sidebar 
          displayHistogram={histogramImg}
          handleOperation = {handleOperation}
        />
        <ImagePanel 
          displayImage ={image}
          handleImageChange = {handleImageChange}
        />
      </div>
    </div>
  );
};

export default App;