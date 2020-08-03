import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
  // Piece of state called file, uses function setFile to update file
  // Set inital to null because we dont select the file
  const [file, setFile] = useState(null);

  // error in state
  const [error, setError] = useState(null);

  // allowed filetypes
  const types = ['image/png', 'image/jpeg'];

  const changeHandler = (e) => {
    // access the 1st file user has selected
    let selected = e.target.files[0];

    // check if file selected & is allowed filetype and store in local state
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      // Reset error if wrong filetype was selected before
      setError('');
    } else {
      // reset the value
      setFile(null);
      // error
      setError('Please select an image file (png or jpeg)');
    }
  };

  return (
    <form>
      <label>
        <input type='file' onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className='output'>
        {error && <div className='error'>{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
