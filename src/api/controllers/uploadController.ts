// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

import UploadMessageResponse from '../../interfaces/UploadMessageResponse';

// Function to handle cat upload and send a response
const catPost = (req: any, res: any) => {
  try {
    const upCatData = {
      filename: 'cat.jpg',
      location: res.locals.coords,
    };

    // Prepare the response object
    const response: UploadMessageResponse = {
      message: 'Cat uploaded successfully',
      data: upCatData,
    };

    // Send the response to the client
    res.status(200).json(response);
  } catch (error) {
    // Handle errors here
    console.error('Error processing cat upload:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export {catPost};
