module.exports = ({ vehicleData, totalSales, startDate, endDate }) => {
  const today = new Date();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
  .report-container {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    height: 100%;
    text-align: center;
  }
  .report-container table,
  .report-container th {
    border: 1px solid #333;
  }
  .report-container table {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    border-collapse: collapse;
    width: 80%;
    height: 75%;
    background-color: #fff;
  }
  .report-container table th {
    text-align: center;
    background-color: #310b04;
    height: 40px;
    color: #fff;
    letter-spacing: 0.04rem;
    font-size: 0.9rem;
  }
  .report-container table td {
    padding: 10px;
  }
  .report-container a {
    position: relative;
  }
  .report-title {
    display: flex;
    justify-content: space-between;
  }
  .report-title .details {
    display: flex;
    font-weight: bold;
    flex-direction: column;
    justify-content: right;
  }
  .report-header {
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .report-header table {
    text-align: left;
  }
  .report-header .title {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .report-header .details {
    font-size: 1rem;
  }
  .report-details td {
    border: 1px solid #333;
  }
  .report-logo{
    width: 200px;
    height: 130px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .report-footer{
    padding-right: 20px;
    padding-left: 20px;
    margin-top:90%;
    margin-bottom: 0;
  }
  </style>
  <title>Sales Report</title>
</head>
<body>
<section class='report-container'>
  <div class='report-title'>    
    <div class='details'>
      <h2 class='large'>NADEESHANS (PVT) LTD</h2>
      <h4 class='small'>Dealers in Motor Vehicles</h4>
    </div>
  </div>
  <h2 class='large'><b><u>MOST SOLD VEHICLES</u></b></h2>
  <div class='report-header'>
    <table>
      <tbody>
        <tr>
          <td class='title'>Report Issued Date:</td>
          <td class='details'>${`${today.getDate()}. ${
            today.getMonth() + 1
          }. ${today.getFullYear()}.`}</td>
        </tr>
        <tr>
          <td class='title'>Most Sold Vehicle:</td>
          <td class='details'>Honda Civic</td>
        </tr>
        <tr>
          <td class='title'>Considered Duration:</td>
          <td class='details'>${startDate} to ${endDate}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class='report-details'>
    <table>
      <thead>
        <tr>
          <th>MAKE</th>
          <th>MODEL</th>
          <th>COLOR</th>
          <th>CARS SOLD</th>
          <th>REVENUE</th>
        </tr>
      </thead>
      <tbody>
      ${vehicleData.map(
        vehicle =>
          `<tr>
          <td>${vehicle.make}</td>
          <td>${vehicle.model}</td>
          <td>${vehicle.color}</td>
          <td>${vehicle.price}</td>
        </tr>`
      )}     
        <tr>
          <td colspan='4'>TOTAL SALES</td>
          <td>${vehicleData.map(vehicle => {
            totalSales = totalSales + parseInt(vehicle.price);
          })}</td>
        </tr>
        <tr>
          <td colspan='4'>TOTAL REVENUE</td>
          <td>${totalSales}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class='report-footer'>
    <p class='small'>
      Report Issued by NADEESHANS (PVT) LTD. No. 17 &amp; 19, St. Peter's Place,
      Bambalapitiya, Colombo 04. Contact: +94 11 250 82800/+94 77 732 8634
    </p>
  </div>
</section>
</body>
</html>`;
};
