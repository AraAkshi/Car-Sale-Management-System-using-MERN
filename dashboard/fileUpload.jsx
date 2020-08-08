import React, { useState } from 'react';
import { DropZone, Label, BasePropertyProps, Box } from 'admin-bro';
import { unflatten } from 'flat';

// const UploadPhoto: React.FC<BasePropertyProps> = props => {
//   const { property, record, onChange } = props;

//   const onUpload = (files: FileList) => {
//     const newRecord = { ...record };
//     const file = files.length && files[0];

//     onChange({
//       ...newRecord,
//       params: {
//         ...newRecord.params,
//         [property.name]: file,
//       },
//     });
//     event.preventDefault();
//   };

//   return (
//     <Box>
//       <Label>{property.label}</Label>
//       <DropZone multiple onChange={onUpload} />
//     </Box>
//   );
// };

// export default UploadPhoto;
