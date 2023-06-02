import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { fabric } from "fabric";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyPDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const canvasRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      canvas.setDimensions({ width: 600, height: 800 }, { cssOnly: true });
      canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));
    }
  }, []);

  const handleAddText = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const text = new fabric.Textbox("Sample Text", {
        left: 100,
        top: 100,
        fontSize: 16,
        fontFamily: "Arial",
      });
      canvas.add(text);
      canvas.renderAll();
    }
  };

  return (
    <div>
      <button onClick={handleAddText}>Add Text</button>

      <Document file="/example.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1}>
            <canvas ref={canvasRef} />
          </Page>
        ))}
      </Document>
    </div>
  );
};

export default MyPDFViewer;
