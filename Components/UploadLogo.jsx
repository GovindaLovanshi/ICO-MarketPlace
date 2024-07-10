import React, { useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import UploadIcon from './SVG/UploadICON';

const UploadLogo = ({
  imageUrl,
  setLoader,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 200 });
  const notifyError = (msg) => toast.error(msg, { duration: 200 });

  const uploadToIPFS = async (file) => {
    if (file) {
      console.log("FILE");
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          maxBodyLength: 'Infinity',
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_key: PINATA_SECRET_KEY,
            'Content-Type': 'multipart/form-data',
          },
        });

        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        setImageUrl(url);
        setLoader(false);
        notifySuccess('Logo uploaded to IPFS successfully');
      } catch (error) {
        setLoader(false);
        notifyError('Failed to upload logo to IPFS');
        console.error(error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxSize: 50000000000,
  });

  return (
    imageUrl ? (
      <div>
        <img
          src={imageUrl}
          style={{ width: '200px', height: 'auto' }}
          alt=""
        />
      </div>
    ) : (
      <div {...getRootProps()}>
        <label htmlFor="file" className="custom-file-upload">
          <div className="icon">
            <UploadIcon />
          </div>
          <div className="text">
            <span>Click to Upload Logo</span>
          </div>
          <input type="file" id="file" {...getInputProps()} />
        </label>
      </div>
    )
  );
};

export default UploadLogo;