import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styled from '@emotion/styled';

const PictureFrame = styled.div`
    float: center;
    border: 3px solid #ff8d26;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin: 20px;
    display: inline-block;
    overflow: hidden;
    position: relative;
    opacity: 1;
    &:hover {
        opacity: 40%; 
        cursor: pointer;
      }
      
`

const ImageCropComponent = (props) => {
  const [upImg, setUpImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 }); // Aspect ratio set to 1:1 for a square crop
  const [completedCrop, setCompletedCrop] = useState(null);

  const avatar = props.avatar;

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      console.log("HERE")
    }
  };

  const onLoad = useCallback((img) => {
      console.log("Here")
    const imageAspectRatio = img.naturalWidth / img.naturalHeight;
    const cropAspectRatio = 1; // Square aspect ratio
    const aspect = imageAspectRatio / cropAspectRatio;
    setCrop({ ...crop, aspect });
  }, [crop]);
  let fileInput = React.createRef();

  const onOpenFileDialog = () => {
    fileInput.current.click();
};

  return (
    <PictureFrame>
      <input
      type="file" 
      accept="image/*" 
      onChange={onSelectFile} 
      ref={fileInput}
      hidden={true}
      />
      <img width="max-content" height="max-content" onClick={onOpenFileDialog} src={avatar} width='100%' height='auto' />
      {upImg && (
        <ReactCrop
          src={upImg}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onLoad}
          onComplete={(c) => setCompletedCrop(c)}
          onChange={(c) => setCrop(c)}
        />
      )}
      {completedCrop && (
        <div>
          <h2>Preview</h2>
          <img
            src={upImg}
            alt="Crop preview"
            style={{
              maxWidth: '100%',
              margin: 'auto',
              borderRadius: '50%', // To give a circular appearance for the square crop
            }}
          />
          {/* You can use completedCrop to save the cropped image or display a preview */}
        </div>
      )}
    </PictureFrame>
  );
};

export default ImageCropComponent;
