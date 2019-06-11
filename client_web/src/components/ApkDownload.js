import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Paths from '../res/values/Paths'

class ApkDownload extends Component {
  componentDidMount () {
    this.inputElement.click();
    this.props.history.push(Paths.root)
  }

  render () {
    return (
      <a ref={a => this.inputElement = a} href={'/build/client.apk'} download />
    );
  }
};

const WithRouterApkDownload = withRouter(ApkDownload);

export default WithRouterApkDownload;
