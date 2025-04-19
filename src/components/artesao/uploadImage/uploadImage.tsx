import React from 'react';
import { UploadContainer } from './uploadImageStyle';

interface Props {
  onUpload: (file: File) => void;
}

const UploadImage: React.FC<Props> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <UploadContainer>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </UploadContainer>
  );
};

export default UploadImage;
