import { Placeholder } from "../placeholder";
import { useMarketDepthData } from "./useMarketDepthData";
import { schemas } from "../../data/algo-schemas";
import './MarketDepthFeature.css';


// // prettier-ignore
// const data: MarketDepthRow[] = [
//   { symbolLevel:"1230", level: 0, bid: 1000, bidQuantity: 500, offer: 1010, offerQuantity: 700 },
//   { symbolLevel:"1231", level: 1, bid: 990, bidQuantity: 700, offer: 1012, offerQuantity: 400 },
//   { symbolLevel:"1232", level: 2, bid: 985, bidQuantity: 1200, offer: 1013, offerQuantity: 800 },
//   { symbolLevel:"1233", level: 3, bid: 984, bidQuantity: 1300, offer: 1018, offerQuantity: 750 },
//   { symbolLevel:"1234", level: 4, bid: 970, bidQuantity: 800, offer: 1021, offerQuantity: 900 },
//   { symbolLevel:"1235", level: 5, bid: 969, bidQuantity: 700, offer: 1026, offerQuantity: 1500 },
//   { symbolLevel:"1236", level: 6, bid: 950, bidQuantity: 750, offer: 1027, offerQuantity: 1500 },
//   { symbolLevel:"1237", level: 7, bid: 945, bidQuantity: 900, offer: 1029, offerQuantity: 2000 },
//   { symbolLevel:"1238", level: 8, bid: 943, bidQuantity: 500, offer: 1031, offerQuantity: 500 },
//   { symbolLevel:"1239", level: 9, bid: 940, bidQuantity: 200, offer: 1024, offerQuantity: 800 },
// ];

/**
 * TODO
 */
export const MarketDepthFeature = () => {
  const data = useMarketDepthData(schemas.prices);
  
  // Define min and max values for scaling
  const min = 1000;
  const max = 4000;

  // Function to calculate the width of the bar based on the value
  const getBarWidth = (value) => {
    const normalized = (Math.min(Math.max(value, min), max) - min) / (max - min);
    return `${normalized * 100}%`; // Return width as a percentage
  };

  // Function to determine the background color of the bar based on the value
  const getBarColor = (value, isBid) => {
    if (isBid) {
      // Solid blue color for bid quantity
      return `rgb(0, 0, ${Math.round(255 * (1 - (value - min) / (max - min)))})`;
    } else {
      // Solid red color for ask quantity
      return `rgb(${Math.round(255 * (1 - (value - min) / (max - min)))}, 0, 0)`;
    }
  };

  
  return (
    <div className="market-depth-feature">
      <h2>Market Depth Data</h2>
      {data && data.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th></th>
              <th colSpan="2">Bid</th>
              <th colSpan="2">Ask</th>
            </tr>
            <tr>
              <th></th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.level}</td>
                <td>
                  <div style={{
                    backgroundColor: getBarColor(row.bidQuantity, true),
                    width: getBarWidth(row.bidQuantity),
                    height: '100%',
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '1.5em'
                  }}>
                    {row.bidQuantity}
                  </div>
                </td>
                <td>{row.bid} {row.bidMovement}</td> {/* Show bid movement arrow */}
                <td>{row.offer} {row.offerMovement}</td> {/* Show offer movement arrow */}
                <td>
                  <div style={{
                    backgroundColor: getBarColor(row.offerQuantity, false),
                    width: getBarWidth(row.offerQuantity),
                    height: '100%',
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '1.5em'
                  }}>
                    {row.offerQuantity}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );


    // // Function to determine the background color based on the value
    // const getBidColor = (value) => {
    //   // Define min and max values for scaling
    //   const min = 2000;
    //   const max = 5000;
  
    //   // Normalize value between 0 and 1
    //   const normalized = (Math.min(Math.max(value, min), max) - min) / (max - min);
  
    //   // Return color from a shade of blue based on normalized value
    //   const blueIntensity = Math.round(255 * (1 - normalized)); // Scale blue intensity
    //   return `rgb(0, 0, ${blueIntensity})`; // Solid blue color for bid quantity
    // };
  
    // const getAskColor = (value) => {
    //   // Define min and max values for scaling
    //   const min = 2000;
    //   const max = 5000;
  
    //   // Normalize value between 0 and 1
    //   const normalized = (Math.min(Math.max(value, min), max) - min) / (max - min);
  
    //   // Return color from a shade of red based on normalized value
    //   const redIntensity = Math.round(255 * (1 - normalized)); // Scale red intensity
    //   return `rgb(${redIntensity}, 0, 0)`; // Solid red color for ask quantity
    // };

    // return (
    //   <div className="market-depth-feature">
    //     <h2>Market Depth Data</h2>
    //     {data && data.length > 0 ? (
    //       <table border="1" cellPadding="10">
    //         <thead>
    //         <tr>
    //           <th></th>
    //           <th colSpan="2">Bid</th>
    //           <th colSpan="2">Ask</th>
    //         </tr>
    //           <tr>
    //             <th></th>
    //             <th>Quantity</th>
    //             <th>Price</th>
    //             <th>Price</th>
    //             <th>Quantity</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {data.map((row, index) => (
    //           <tr key={index}>
    //             <td>{row.level}</td>
    //             <td style={{ backgroundColor: getBidColor(row.bidQuantity) }}>
    //               {row.bidQuantity}
    //             </td>
    //             <td>{row.bid}</td>
    //             <td>{row.offer}</td>
    //             <td style={{ backgroundColor: getAskColor(row.offerQuantity) }}>
    //               {row.offerQuantity}
    //             </td>
    //           </tr>
    //         ))}
    //         </tbody>
    //       </table>
    //     ) : (
    //       <p>No data available</p>
    //     )}
    //   </div>
    // );
  
  return <Placeholder />;
  // return <MarketDepthPanel  data = {data}/>;
};
