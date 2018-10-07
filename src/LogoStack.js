import React, { Component, Fragment } from "react";

import animation from "./Animation";

class LogoStack extends Component {
  componentDidMount() {
    animation.show();
  }

  render() {
    return (
      <Fragment>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="265"
          height="250"
          id="react_logo"
          viewBox="200 70 475 500"
        >
          <g fill="#61DAFB">
            <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
            <circle cx="420.9" cy="296.5" r="45.7" />
            <path d="M520.5 78.1z" />
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="html_logo"
          width="256"
          viewBox="0 0 545 550"
          height="256"
          preserveAspectRatio="xMidYMid"
        >
          <path d="M108.382 0h23.077v22.8h21.11V0h23.078v69.044H152.57v-23.12h-21.11v23.12h-23.077L108.382 0zM205.994 22.896h-20.316V0h63.72v22.896h-20.325v46.148h-23.078l-.001-46.148zM259.511 0h24.063l14.802 24.26L313.163 0h24.072v69.044h-22.982V34.822l-15.877 24.549h-.397l-15.888-24.549v34.222h-22.58V0zM348.72 0h23.084v46.222h32.453v22.822H348.72V0z" />
          <g>
            <path
              fill="#E34E26"
              d="M107.125 470.727L74.012 99.297h363.691l-33.154 371.458L255.769 512z"
            />
            <path
              fill="#EF662A"
              d="M255.857 129.657v350.792l120.307-33.348 28.346-317.444z"
            />
            <path
              fill="#FFF"
              d="M141.761 175.217l12.28 137.761h157.895l-5.299 59.088-50.838 13.745-50.742-13.726-3.393-37.939h-45.727l6.539 73.136 93.311 25.917 93.432-25.917 12.525-139.853H195.706l-4.168-46.652H365.873l4.08-45.56z"
            />
            <g fill="#EBEBEB">
              <path d="M255.857 175.217H141.761l12.28 137.761h101.816v-45.549h-60.151l-4.168-46.652h64.319zM255.857 385.791l-.058.02-50.742-13.726-3.393-37.939h-45.727l6.539 73.136 93.311 25.917.07-.02z" />
            </g>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="256"
          viewBox="0 0 280 360"
          id="css_logo"
          preserveAspectRatio="xMidYMid"
        >
          <path
            fill="#264DE4"
            d="M127.843868 360.087912l-104.1821537-28.92167L.44518681 70.7657143H255.554813L232.31367 331.125451l-104.469802 28.962461z"
          />
          <path
            fill="#2965F1"
            d="M212.416703 314.546637l19.861099-222.4893183H128V337.950242l84.416703-23.403605z"
          />
          <path
            fill="#EBEBEB"
            d="M53.6685714 188.636132l2.8624176 31.936703H128v-31.936703H53.6685714zM47.917011 123.994725l2.9032088 31.937407H128v-31.937407H47.917011zM128 271.580132l-.139956.037275-35.5685275-9.60422-2.2737583-25.471297H57.957978l4.4743736 50.145758 65.4206594 18.161231.146989-.040791v-33.227956z"
          />
          <path d="M60.4835165 0h38.6813187v16.1758242H76.6593407v16.1758242h22.5054945v16.1758241H60.4835165V0zM106.901099 0h38.681319v14.0659341h-22.505495v2.8131868h22.505495v32.3516483h-38.681319V34.4615385h22.505494v-2.8131869h-22.505494V0zM153.318681 0H192v14.0659341h-22.505495v2.8131868H192v32.3516483h-38.681319V34.4615385h22.505495v-2.8131869h-22.505495V0z" />
          <path
            fill="#FFF"
            d="M202.126769 188.636132l5.765627-64.641407h-80.002814v31.937407h45.00255l-2.906022 32.704h-42.096528v31.936703h39.326945l-3.707076 41.419956-35.619869 9.614066v33.22655l65.472704-18.145759.480351-5.395692 7.504879-84.079824.779253-8.576z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="215"
          height="220"
          viewBox="0 0 275 300"
          id="js_logo"
          preserveAspectRatio="xMidYMid"
        >
          <path fill="#F7DF1E" d="M0 0h256v256H0V0z" />
          <path d="M67.311746 213.932292l19.590908-11.856051c3.7794539 6.701105 7.2175746 12.370896 15.464432 12.370896 7.905117 0 12.88899-3.092318 12.88899-15.120254v-81.798096h24.057499v82.13821c0 24.917333-14.605816 36.258946-35.915175 36.258946-19.2451048 0-30.4164571-9.96734-36.0870603-21.995683M152.380952 211.354413l19.58847-11.341613c5.156572 8.421181 11.858489 14.607035 23.714946 14.607035 9.968153 0 16.324673-4.983873 16.324673-11.857676 0-8.248483-6.529625-11.170134-17.527873-15.980089l-6.012749-2.579505c-17.357206-7.387835-28.871111-16.667225-28.871111-36.257727 0-18.04353 13.7472-31.791543 35.228444-31.791543 15.294172 0 26.292013 5.327645 34.195911 19.247137l-18.731073 12.028343c-4.124444-7.388648-8.591034-10.309486-15.464431-10.309486-7.045689 0-11.513905 4.467809-11.513905 10.309486 0 7.217574 4.468216 10.139631 14.777702 14.607847l6.013968 2.577473c20.449524 8.764546 31.963428 17.699353 31.963428 37.804292 0 21.653537-17.012215 33.509588-39.86692 33.509588-22.339454 0-36.774603-10.653664-43.819073-24.573562" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="250"
          height="250"
          id="node_logo"
          viewBox="0 0 274 295"
          preserveAspectRatio="xMidYMid"
        >
          <path
            fill="#539E43"
            d="M127.999999 288.463771c-3.975155 0-7.6853-1.060043-11.130435-2.915115l-35.2463756-20.935818c-5.3002084-2.915114-2.650103-3.975156-1.0600426-4.505177 7.1552801-2.385091 8.4803317-2.915114 15.900623-7.15528.7950291-.53002 1.8550717-.265009 2.650103.265011l27.0310552 16.165632c1.060043.530021 2.385094.530021 3.180126 0l105.739129-61.21739c1.060043-.530023 1.590063-1.590063 1.590063-2.915115V83.0807467c0-1.3250538-.53002-2.3850941-1.590063-2.9151143L129.325053 19.2132506c-1.060043-.5300201-2.385094-.5300201-3.180126 0L20.4057954 80.1656324c-1.0600403.5300202-1.5900605 1.8550717-1.5900605 2.9151143V205.250519c0 1.060041.5300202 2.385092 1.5900605 2.915115l28.8861293 16.695652c15.6356117 7.950309 25.4409949-1.325052 25.4409949-10.600415V93.681159c0-1.5900605 1.3250515-3.1801232 3.1801232-3.1801232h13.5155288c1.5900627 0 3.1801232 1.3250515 3.1801232 3.1801232v120.579712c0 20.935818-11.3954436 33.126293-31.2712211 33.126293-6.0952375 0-10.8654235 0-24.3809523-6.625258l-27.8260867-15.90062C4.24016581 220.886129 0 213.46584 0 205.515528V83.3457557c0-7.9503092 4.24016581-15.3706005 11.1304347-19.3457551L116.869564 2.78260752c6.62526-3.71014336 15.635612-3.71014336 22.260872 0L244.869565 64.0000006C251.759834 67.9751552 256 75.3954465 256 83.3457557V205.515528c0 7.950312-4.240166 15.370601-11.130435 19.345758l-105.739129 61.21739c-3.445137 1.590063-7.420291 2.385095-11.130437 2.385095zm32.596275-84.008283c-46.376813 0-55.917185-21.200829-55.917185-39.221533 0-1.590062 1.325052-3.180123 3.180123-3.180123h13.78054c1.590061 0 2.915112 1.06004 2.915112 2.650103 2.120083 14.045549 8.215323 20.935818 36.306419 20.935818 22.260871 0 31.801243-5.035197 31.801243-16.960663 0-6.890269-2.650103-11.925466-37.366461-15.370601-28.886127-2.915114-46.90683-9.275363-46.90683-32.331263 0-21.4658385 18.020703-34.1863359 48.231884-34.1863359 33.921324 0 50.616976 11.6604571 52.737059 37.1014499 0 .795031-.265011 1.590063-.795031 2.385094-.53002.53002-1.325052 1.06004-2.120083 1.06004h-13.780538c-1.325051 0-2.650103-1.06004-2.915114-2.385092-3.180123-14.575569-11.395446-19.345757-33.126293-19.345757-24.380954 0-27.296066 8.480332-27.296066 14.84058 0 7.685301 3.445134 10.070395 36.306418 14.310561 32.596273 4.240165 47.966873 10.335403 47.966873 33.126292-.265011 23.320912-19.345755 36.57143-53.00207 36.57143z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
          width="250"
          height="250"
          id="redux_logo"
          viewBox="0 0 270 244"
        >
          <path
            fill="#764ABC"
            d="M177.381 169.733c9.447-.978 16.614-9.122 16.288-18.896-.325-9.773-8.47-17.592-18.243-17.592h-.651c-10.1.326-17.918 8.796-17.592 18.895.326 4.887 2.28 9.122 5.212 12.054-11.076 21.828-28.016 37.791-53.426 51.148-17.266 9.122-35.183 12.38-53.1 10.1-14.66-1.955-26.062-8.47-33.23-19.222-10.424-15.963-11.401-33.23-2.605-50.496 6.19-12.38 15.962-21.502 22.152-26.063-1.303-4.235-3.258-11.402-4.235-16.614-47.237 34.207-42.35 80.468-28.016 102.295 10.75 16.29 32.577 26.389 56.684 26.389 6.515 0 13.03-.652 19.546-2.28 41.699-8.145 73.299-32.905 91.216-69.718zm57.336-40.397c-24.759-28.995-61.245-44.958-102.944-44.958h-5.212c-2.932-5.864-9.122-9.774-15.963-9.774h-.652C99.848 74.93 92.03 83.4 92.355 93.5c.326 9.773 8.47 17.592 18.243 17.592h.651c7.167-.326 13.357-4.887 15.963-11.077h5.864c24.759 0 48.214 7.167 69.39 21.176 16.288 10.751 28.016 24.76 34.531 41.7 5.538 13.683 5.212 27.04-.652 38.443-9.121 17.266-24.432 26.714-44.63 26.714-13.031 0-25.41-3.91-31.926-6.842-3.583 3.258-10.099 8.47-14.66 11.729 14.009 6.515 28.343 10.099 42.025 10.099 31.274 0 54.404-17.267 63.2-34.533 9.447-18.896 8.795-51.474-15.637-79.165zM69.225 175.27c.326 9.774 8.47 17.592 18.243 17.592h.652c10.099-.325 17.917-8.796 17.591-18.895-.325-9.774-8.47-17.592-18.243-17.592h-.651c-.652 0-1.63 0-2.28.325-13.357-22.153-18.895-46.26-16.94-72.323 1.302-19.547 7.818-36.488 19.22-50.497 9.447-12.054 27.69-17.918 40.07-18.243 34.531-.652 49.19 42.351 50.168 59.618 4.235.977 11.402 3.258 16.289 4.887C189.434 27.366 156.857 0 125.584 0c-29.32 0-56.359 21.176-67.11 52.451-14.985 41.7-5.212 81.771 13.031 113.372-1.628 2.28-2.606 5.864-2.28 9.448z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1270 1225"
          width="255"
          height="250"
          id="webpack_logo"
        >
          <path
            fill="#fff"
            fillOpacity="0"
            d="M600 0l530.3 300v600L600 1200 69.7 900V300z"
          />
          <path
            fill="#8ed6fb"
            d="M1035.6 879.3l-418.1 236.5V931.6L878 788.3l157.6 91zm28.6-25.9V358.8l-153 88.3V765l153 88.4zm-901.5 25.9l418.1 236.5V931.6L320.3 788.3l-157.6 91zm-28.6-25.9V358.8l153 88.3V765l-153 88.4zM152 326.8L580.8 84.2v178.1L306.1 413.4l-2.1 1.2-152-87.8zm894.3 0L617.5 84.2v178.1l274.7 151.1 2.1 1.2 152-87.8z"
          />
          <path
            fill="#1c78c0"
            d="m580.8 889.7l-257-141.3v-280l257 148.4v272.9m36.7 0l257-141.3v-280l-257 148.4v272.9m-276.3-453.7l258-141.9 258 141.9-258 149-258-149"
          />
        </svg>
      </Fragment>
    );
  }
}

export default LogoStack;