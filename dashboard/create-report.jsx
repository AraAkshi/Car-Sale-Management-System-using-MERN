import React, {Component} from 'react';
import axios from 'axios';
import vehicle from '../models/Vehicle';

class CreateReport extends Component{
  state={
    type: '',
    from: '',
    to: '',
  }

  createAndDownloadPdf = () => {
    axios.post(./create-pdf, this.state)
  }
}
