import { Component } from "react";

export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return(
            <div>
              <h2>Download page</h2>
              <h2>{this.props.id}</h2>
            </div>
          )
    }
}
