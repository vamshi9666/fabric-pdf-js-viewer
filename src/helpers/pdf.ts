import * as pdfjs from "pdfjs-dist";

const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const Base64Prefix = "data:application/pdf;base64,";

export const toDataURL = (url: string) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

function readBlob(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
  });
}

export async function printPDF(pdfData: any) {
  pdfData = pdfData instanceof Blob ? await readBlob(pdfData) : pdfData;
  const data = atob(
    pdfData.startsWith(Base64Prefix)
      ? pdfData.substring(Base64Prefix.length)
      : pdfData
  );
  // Using DocumentInitParameters object to load binary data.
  const loadingTask = pdfjs.getDocument({ data });
  return loadingTask.promise.then((pdf) => {
    const numPages = pdf.numPages;
    return new Array(numPages).fill(0).map((__, i) => {
      const pageNumber = i + 1;
      return pdf.getPage(pageNumber).then((page) => {
        //  retina scaling
        const viewport = page.getViewport({ scale: window.devicePixelRatio });
        // Prepare canvas using PDF page dimensions
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        const renderTask = page.render(renderContext);
        return renderTask.promise.then(() => canvas);
      });
    });
  });
}
