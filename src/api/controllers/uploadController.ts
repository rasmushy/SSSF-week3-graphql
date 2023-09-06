// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

import UploadMessageResponse from '../../interfaces/UploadMessageResponse';

const catPost = (req: any, res: any) => {
  try {
    const catData = {
      filename: req.file.filename,
      location: res.locals.coords,
    };

    const response: UploadMessageResponse = {
      message: 'cat uploaded',
      data: catData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing cat upload:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export {catPost};
