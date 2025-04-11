import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import ImagePanel from './components/imagepanel/ImagePanel';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './ApiConfig';

/**
 * Main application component
 * Demo Comment
 */
const App = () => {
  // State variables
  const [image, setImage] = useState(undefined);
  const [histogramImg, setHistogram] = useState(null);
  const [currentImgName, setImageName] = useState(undefined);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown before
    const popupShownBefore = localStorage.getItem('popupShown');

    // If not shown before or page is refreshed, show the popup
    if (!popupShownBefore || window.performance && window.performance.navigation.type === 1) {
      setShowPopup(true);

      // Store flag indicating the popup has been shown
      localStorage.setItem('popupShown', 'true');
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  /**
   * Function to handle image download
   */
  const handleDownload = () => {
    // Creating a temporary link to download the image
    const link = document.createElement("a");
    link.href = image;
    link.download = currentImgName + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Function to resize image URL to fit the canvas
   * @param {string} imageUrl - URL of the image
   * @returns {Promise<string>} - Resolved with resized image data URL
   */
  const resizeImageUrlToCanvas = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        // Calculating dimensions for resizing
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

        // Resizing image and resolving the promise with data URL
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

  /**
   * Function to resize the image to fit the canvas
   * @param {HTMLImageElement} imgToResize - Image element to resize
   * @returns {string} - Resized image data URL
   */
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

  /**
   * Function to handle resetting the image to its original state
   */
  const handleReset = () => {
    const getImgData = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.getImageById}?imageId=${currentImgName}_original`);
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
          });
        setHistogram(data.histogramMat);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  /**
   * Function to save the original image
   */
  const handleSaveOriginal = () => {
    const postData = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.updateOriginal}?imageName=${currentImgName}`);
          resolve(response.data);
        } catch (error) {
          console.error('Error posting data:', error);
          reject(error);
        }
      });
    };
    postData();
  }

  /**
   * Function to handle image operations
   * @param {string} operationType - Type of operation
   */
  const handleOperation = (operationType) => {
    if (image == undefined) {
      alert("Please upload an Image first !");
      return;
    }
    const getImgData = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.operation}${operationType}&imageName=${currentImgName}`);
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
          });
        setHistogram(data.histogramMat);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Function to split file name and extension
   * @param {string} fileName - Name of the file
   * @returns {object} - Object containing name and extension
   */
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

  /**
   * Function to handle image change
   * @param {Event} e - Change event
   */
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
                const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.saveImage}`, {
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
              return axios.get(`${API_BASE_URL}${API_ENDPOINTS.getImageHistogram}?imageId=${data}`);
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
      <div className={`popup ${showPopup ? 'show' : ''}`}>
        <div className="popup-content">
          <div className='containerIntroPop'>
          <p className='starterText'>Hey!</p>
          <p className='introText'>I am <strong>Sudhanva</strong> , a Full stack developer and cloud enthusiast based in Boston, MA.
            I have created this app using java RESTfull apis using spring boot in the backend and ReactJS for the frontend. It performs several basic image manipulation operations.
            Upload an image and get exploring !
          </p>

          </div>
         
          <button onClick={handleClosePopup} class="pushable">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
             Explore the App !
            </span>
          </button>
        </div>
      </div>
      <div className='bodyContainer'>
        <Sidebar
          displayHistogram={histogramImg}
          handleOperation={handleOperation}
        />
        <ImagePanel
          displayImage={image}
          handleImageChange={handleImageChange}
          handleDownload={handleDownload}
          handleReset={handleReset}
          handleSaveOriginal={handleSaveOriginal}
        />
      </div>
    </div>
  );
};

export default App;
