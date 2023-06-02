import { useEffect, useRef } from "react";
import "./assets/pspdfkit.js";
import kit from "pspdfkit";

export default function PsPDFViewr() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let load;

    (async function () {
      load = await import("pspdfkit").then((r) => r.default);
      console.log("oad", kit);

      await load.load({
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: "/example.pdf",

        baseUrl: "https://unpkg.com/pspdfkit@2023.3.1/dist/",
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        // baseUrl: `${window.location.protocol}//${window.location.host}/assets/`,
        disableWebAssemblyStreaming: true,
        // licenseKey:
        //   "pDEUBZt7C65goJ-JD55uaPV8EnkvdudfmM3NfURFdG-SPK7YZal98EdrXnS-zwoyBPMwT9WjLW9Jze9J3RVhFKimQSV2e5nFb3Li-j3223jvsh-_WRl6-KeEUHSokA8IRza-4NS0RAKbpE7fliC4gDRAsZd-xPkq3WrJQ_S7tzZjzIfs4z-Trc3UND43T4rLYPoM9n6N6_LBQcr0E0jGd6mLnY6tioJzn6VEOBGUBl9JVEhl7ELFI8W8JtFEFA_M0-n8JSdvrwuaD3Hi-WcjxIL2NfL4YGDKnrNUwgBu3nJ81Syx-4n1F3V1MGdx6egqwVUAP91ZZSuEATxFw8TXupH-XPOfrngG7dmtSkbDpEzNh7zjDvFvQCaASe6w9jyztqFDid_uPnGdkBmv1U39YI02LUNXU9-VNtnNHTg_-lEzjVzDnUArsKj4NdlKlDzRBDoMuGTIn6e5_NdSq6ZtOIwAhJza2KpdW8uS-UNuvMmZtEsrYdNOrJ_khlIZsuKz6C7rgerqwsNSxeDpqpiHNlmvRDjRLnYqtUeh_C9YOhWUfEP8qaYfEvUbWLhNsJY9Cvm5dszRPZ3mzULJFlEzN19cMILyvwfr1PffFKHu21LUyn6_nN8iCt1EuEeQiTja_aA9_8dHOIw7_UWZ-HJ0aiPwG-8CpdU2dlOU1aKnZ-bf6Wn9ch9KuWd9S0jVl2bwlWhOJ0dHrXEjcIceLnZVxTUbFcIMnkkauMQMJ3VQPd4q-nrFROdV8fQQsYjKhDVa",
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
