
import 'pdfjs-dist/web/pdf_viewer.css';
import { PDFJS as PDFJSViewer } from 'pdfjs-dist/web/pdf_viewer.js';


import 'pdfjs-dist/web/pdf_viewer.css';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import './Viewer.css';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.initEventBus();
    this.state = {
      doc: null,
      scale: undefined,
    };
  }
  initEventBus() {
    let eventBus = new PDFJSViewer.EventBus();
    eventBus.on('pagesinit', (e) => {
      this.setState({
        scale: this._pdfViewer.currentScale
      });
      if (this.props.onInit) {
        this.props.onInit({});
      }
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({scale: this.state.scale});
      }
    });
    eventBus.on('scalechange', (e) => {
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({scale: e.scale});
      }
    });
    this._eventBus = eventBus;
  }
  componentDidMount() {
    let viewerContainer = ReactDOM.findDOMNode(this);
    this._pdfViewer = new PDFJSViewer.PDFViewer({
      container: viewerContainer,
      eventBus: this._eventBus,
    });
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.doc !== nextState.doc) {
      this._pdfViewer.setDocument(nextState.doc);
    }
    if (this.state.scale !== nextState.scale) {
      this._pdfViewer.currentScale = nextState.scale;
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.doc !== nextState.doc ||
        this.state.scale !== nextState.scale) {
      return true;
    }
    return false;
  }
  render() {
    return (<div className="Viewer">
      <div className="pdfViewer"></div>
    </div>);
  }
}


export default Viewer;
