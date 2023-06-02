import {
  CommandBar,
  ICommandBarItemProps,
  VerticalDivider,
  WindowProvider,
} from "@fluentui/react";
import { fabric } from "fabric";
import * as React from "react";
import { printPDF, toDataURL } from "./helpers/pdf";
import "./App.css";

const App = () => {
  const done = React.useRef(false);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [isPagesOpen, setIsPagesOpen] = React.useState(false);

  const [zoomLevel, setZoomLevel] = React.useState(0.4);

  React.useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setZoom(zoomLevel);

    console.log("new zoom", zoomLevel);

    // return () => {
    //   canvas.dispose();
    // };
  }, [zoomLevel]);

  React.useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      containerClass: "cont",
      width: window.innerHeight * 1,
      centeredScaling: true,
      imageSmoothingEnabled: true,
    });

    if (done.current === false) {
      done.current = true;

      console.log("done ", done.current);

      canvas.setHeight(window.outerHeight * 0.9);
      // .canvas;
      toDataURL("/example.pdf")
        .then(printPDF)
        .then((canvases) => {
          return Promise.all(canvases);
        })
        .then((objects) => {
          console.log("obj", objects);
          const scale = 1 / window.devicePixelRatio;

          const [first] = objects;

          const imgInstance = new fabric.Image(first, {
            scaleX: scale,
            scaleY: scale,
            lockMovementX: true,
            lockMovementY: true,
          });
          imgInstance.scaleToWidth(canvas.width);
          canvas.add(imgInstance);
        });
    }
  }, [canvasRef]);

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((z) => (direction === "in" ? z + 0.01 : z - 0.01));
  };
  const items: ICommandBarItemProps[] = [
    {
      key: isPagesOpen ? "hide-pages" : "show pages",
      title: isPagesOpen ? "hide-pages" : "show pages",
      text: "pages",
      iconProps: { iconName: isPagesOpen ? "BookmarksMirrored" : "Bookmarks" },
      iconOnly: true,
      onClick: () => setIsPagesOpen(!isPagesOpen),
    },

    {
      ariaLabel: "New",
      splitButtonAriaLabel: "More New options",
      key: "page-down",
      iconProps: { iconName: "ChevronDown" },
      iconOnly: true,
    },
    {
      key: "page-up",
      iconProps: { iconName: "ChevronUp" },
      iconOnly: true,
    },

    {
      key: "zoom-in",
      iconOnly: true,
      iconProps: { iconName: "ZoomIn" },
      onClick: () => handleZoom("in"),
    },

    {
      key: "zoom-out",
      iconOnly: true,
      iconProps: { iconName: "ZoomOut" },
      onClick: () => handleZoom("out"),
    },
  ];
  return (
    <div
      style={{
        height: "100vh",
        padding: 32,
        // overflow: "scroll",
      }}
    >
      <CommandBar
        items={items}
        farItems={[
          {
            key: "download",
            text: "Download",
            iconProps: { iconName: "Download" },
            onClick: () => console.log("Download"),
          },
        ]}
      />

      <canvas
        style={{
          overflow: "scroll",
          width: "100%",

          // height: "90%",
        }}
        ref={canvasRef}
      />
    </div>
  );
};

export default App;
