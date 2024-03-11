import React, { useState } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import ImagePanel from './components/imagepanel/ImagePanel';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(undefined);
  const [histogramImg, setHistogram] = useState(null);
  const [currentImgName, setImageName] = useState(undefined);

  const handleDownload = () => {
    console.log(image);
    console.log(typeof image);
        const dataURL = image
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = currentImgName+".png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  }

  const resizeImageUrlToCanvas = (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; 
        img.onload = () => {
            const parentElement = document.getElementById("img-panel");
            const parentWidth = parentElement.clientWidth;
            const parentHeight = parentElement.clientHeight;
            const aspectRatio = img.width / img.height;
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
            tempCtx.drawImage(img, 0, 0, desiredWidth, desiredHeight);
            resolve(tempCanvas.toDataURL());
        };
        img.onerror = (error) => {
            reject(error);
        };
        img.src = imageUrl;
    });
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

  const handleReset = () => {
    const getImgData = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`http://localhost:8080/getImageById?imageId=${currentImgName}_original`);
          resolve(response.data); 
          console.log("Resolved Data");
        } catch (error) {
          console.error('Error getting data:', error);
          reject(error); 
        }
      });
    };
    getImgData()
      .then((data) => {
        console.log("in then");
        resizeImageUrlToCanvas(data.base64Image)
          .then((url) => {
            console.log("got url ");
            setImage(url);
          }
          );
        setHistogram(data.histogramMat);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  const handleSaveOriginal = () => {
    const postData = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`http://localhost:8080/updateOriginal?imageName=${currentImgName}`);
          resolve(response.data); 
        } catch (error) {
          console.error('Error posting data:', error);
          reject(error); 
        }
      });
    };
    postData();
  }

    const handleOperation = (operationType) => {
      if(image == undefined ) {
        alert("Please upload an Image first !");
        return;
      }
      const getImgData = () => {
        return new Promise(async (resolve, reject) => {
          try {
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
          resizeImageUrlToCanvas(data.base64Image)
            .then((url) => {
              setImage(url);
            }
            );
          setHistogram(data.histogramMat);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } 

    function splitFileNameAndExtension(fileName) {
      const lastDotIndex = fileName.lastIndexOf('.');
      if (lastDotIndex !== -1) {
          const name = fileName.substring(0, lastDotIndex);
          const extension = fileName.substring(lastDotIndex + 1);
          return { name, extension };
      } else {
          return { name: fileName, extension: '' };
      }
  }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const { name, extension } = splitFileNameAndExtension(file.name);
          
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    setImage(resizeImage(img));
                    setImageName(name);
                    const arrayCanvas = document.createElement('canvas');
                    const array_ctx = arrayCanvas.getContext('2d');
                    arrayCanvas.width = img.width;
                    arrayCanvas.height = img.height;
                    array_ctx.drawImage(img, 0, 0);
                    const postData = () => {
                      return new Promise(async (resolve, reject) => {
                        try {
                          const response = await axios.post('http://localhost:8080/saveImage', {
                            imageName: name,
                            base64DataUrl: arrayCanvas.toDataURL(),
                            extension: extension
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
                        setHistogram(response.data);
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
          handleDownload = {handleDownload}
          handleReset= {handleReset}
          handleSaveOriginal= {handleSaveOriginal}
        />
      </div>
    </div>
  );
};

export default App;