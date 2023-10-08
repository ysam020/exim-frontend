import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const convertToExcel = async (
  rows,
  importer,
  status,
  detailedStatus,
  headers
) => {
  if (rows.length === 0) {
    alert("No Data to export");
    return;
  }
  const dateOfReport = new Date().toLocaleDateString();

  // Row headers
  const dataWithHeaders = rows.map((item) => {
    const arrivalDates = item.container_nos
      .map((container) => container.arrival_date)
      .join(",\n");

    const containerNumbers = item.container_nos
      .map((container) => container.container_number)
      .join(",\n");

    const detentionFrom = item.container_nos
      .map((container) => container.detention_from)
      .join(",\n");

    const size = item.container_nos
      .map((container) => container.size)
      .join(",\n");

    const inv_value = (item.cif_amount / parseInt(item.exrate)).toFixed(2);
    const invoice_value_and_unit_price = `${item.inv_currency} ${inv_value} | ${item.unit_price}`;

    const valueMap = {
      "JOB NO": item.job_no,
      "CUSTOM HOUSE": item.custom_house,
      "SIMS REG NO": item.sims_reg_no,
      "JOB DATE": item.job_date,
      IMPORTER: item.importer,
      "SUPPLIER/ EXPORTER": item.supplier_exporter,
      "INVOICE NUMBER": item.invoice_number,
      "INVOICE DATE": item.invoice_date,
      "AWB/ BL NUMBER": item.awb_bl_no,
      "AWB/ BL DATE": item.awb_bl_date,
      COMMODITY: item.description,
      "BE NUMBER": item.be_no,
      "BE DATE": item.be_date,
      "TYPE OF BE": item.type_of_b_e,
      "NUMBER OF PACKAGES": item.no_of_pkgs,
      UNIT: item.unit,
      "GROSS WEIGHT": item.gross_weight,
      "GATEWAY IGM": item.gateway_igm,
      "GATEWAY IGM DATE": item.gateway_igm_date,
      "IGM NUMBER": item.igm_no,
      "IGM DATE": item.igm_date,
      "LOADING PORT": item.loading_port,
      "ORIGIN COUNTRY": item.origin_country,
      "PORT OF REPORTING": item.port_of_reporting,
      "SHIPPING LINE": item.shipping_line_airline,
      "CONTAINER NUMBER": containerNumbers,
      "ARRIVAL DATE": arrivalDates,
      "DETENTION FROM": detentionFrom,
      SIZE: size,
      "CONTAINER COUNT": item.container_count,
      "NO OF CONTAINER": item.no_of_container,
      TOI: item.toi,
      "UNIT PRICE": item.unit_price,
      "CIF AMOUNT": item.cif_amount,
      "ASSBL VALUE": item.assbl_value,
      "TOTAL DUTY": item.total_duty,
      "OUT OF CHARGE": item.out_of_charge,
      "CONSIGNMENT TYPE": item.consignment_type,
      "BILL NUMBER": item.bill_no,
      "BILL DATE": item.bill_date,
      "CTH NUMBER": item.cth_no,
      STATUS: item.status,
      "DETAILED STATUS": item.detailed_status,
      CHECKLIST: item.checklist,
      "DO VALIDITY": item.do_validity,
      ETA: item.eta,
      "FREE TIME": item.free_time,
      "INVOICE VALUE AND UNIT PRICE": invoice_value_and_unit_price,
      REMARKS: item.remarks,
      "ASSESSMENT DATE": item.assessment_date,
      "EXAMINATION DATE": item.examination_date,
      "DUTY PAID DATE": item.duty_paid_date,
      "OUT OF CHARGE DATE": item.out_of_charge_date,
    };

    // eslint-disable-next-line
    const values = headers.map((val) => {
      if (valueMap[val]) {
        return valueMap[val];
      } else if (val === "CONTAINER NUMBER") {
        return containerNumbers;
      } else if (val === "ARRIVAL DATE") {
        return arrivalDates;
      } else if (val === "DETENTION FROM") {
        return detentionFrom;
      } else if (val === "SIZE") {
        return size;
      }
    });

    return values;
  });

  // Create a new workbook
  const workbook = new ExcelJS.Workbook();

  // Add a worksheet
  const worksheet = workbook.addWorksheet("Sheet1");

  ///////////////////////////////////////  Title Row  //////////////////////////////////////
  // Merge cells for the title row
  const endColumnIndex = headers.length - 1;
  const endColumn =
    endColumnIndex < 26
      ? String.fromCharCode(65 + endColumnIndex)
      : String.fromCharCode(64 + Math.floor(endColumnIndex / 26)) +
        String.fromCharCode(65 + (endColumnIndex % 26));
  worksheet.mergeCells(`A1:${endColumn}1`);

  // Set the title for title row
  const titleRow = worksheet.getRow(1);
  titleRow.getCell(1).value = `${importer}: Status as of ${dateOfReport}`;

  // Apply formatting to the title row
  titleRow.font = { size: 12, color: { argb: "FFFFFFFF" } };
  titleRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472c4" },
  };
  titleRow.alignment = { horizontal: "center", vertical: "middle" };

  // Set text alignment and borders for the title row
  titleRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  titleRow.height = 40;

  /////////////////////////////////////  Header Row  //////////////////////////////////////
  // Add headers row
  worksheet.addRow(headers);

  // Apply formatting to the header row
  const headerRow = worksheet.getRow(2);
  while (headerRow.cellCount > headers.length) {
    headerRow.getCell(headerRow.cellCount).value = undefined;
  }
  headerRow.font = { size: 12, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472c4" },
  };

  // Set text alignment to center for each cell in the header row
  headerRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Increase the height of the header row
  headerRow.height = 35;

  ///////////////////////////////////////  Data Row  //////////////////////////////////////
  // Add the data rows
  for (const row of dataWithHeaders) {
    const dataRow = worksheet.addRow(row);
    const detailedStatus = row[row.length - 1]; // Get the Detailed Status from the last column

    // Apply background color based on Detailed Status
    if (detailedStatus === "Estimated Time of Arrival") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      };
    } else if (detailedStatus === "Custom Clearance Completed") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCFFFF" },
      };
    } else if (detailedStatus === "Discharged") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF4B183" },
      };
    } else if (detailedStatus === "BE Noted, Arrival Pending") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f4b083" },
      };
    } else if (detailedStatus === "BE Noted, Clearance Pending") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF8EAADB" },
      };
    } else if (detailedStatus === "Gateway IGM Filed") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffff66" },
      };
    }

    // Set text alignment to center for each cell in the data row
    dataRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true, // Enable text wrapping for all cells
      };

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Add line breaks after commas in the containerNumbers cell
      if (cell.value && cell.value.toString().includes(",\n")) {
        cell.value = cell.value.replace(/,\n/g, String.fromCharCode(10)); // Replace ",\n" with line break character
      }
    });

    // Adjust row height based on content
    const rowHeight = calculateRowHeight(dataRow);

    // Set the calculated row height
    dataRow.height = rowHeight;
  }

  // Function to calculate row height based on content
  function calculateRowHeight(row) {
    let maxHeight = 0;

    row.eachCell({ includeEmpty: true }, (cell) => {
      const lines = cell.value ? cell.value.toString().split(/\r\n|\r|\n/) : [];
      const lineCount = lines.length;
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Set a minimum height for the row
      let cellHeight = 50;

      // Calculate the required height for the cell based on the number of lines
      if (lineCount > 1) {
        const defaultFontSize = 12; // Set the default font size used in the cell
        const lineSpacing = 2; // Set the additional spacing between lines

        const totalLineHeight =
          lineCount * defaultFontSize + (lineCount - 1) * lineSpacing;

        // Add padding to the calculated line height
        const padding = 10;

        cellHeight = totalLineHeight + padding;
      }

      // Update the maximum cell height for the row
      if (cellHeight > maxHeight) {
        maxHeight = cellHeight;
      }
    });

    return maxHeight;
  }

  // Adjust column widths based on content
  worksheet.columns.forEach((column, id) => {
    let maxLength = 0;

    column.eachCell({ includeEmpty: true }, (cell) => {
      maxLength = 10;
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    if (headers[id] !== "CONTAINER NUMBER") {
      column.width = maxLength < 25 ? 25 : maxLength;
    }
    if (headers[id] === "JOB NO") {
      column.width = 10;
    }
    if (headers[id] === "BE NUMBER") {
      column.width = 15;
    }
    if (headers[id] === "BE DATE") {
      column.width = 18;
    }
    if (headers[id] === "TYPE OF BE") {
      column.width = 15;
    }
    if (headers[id] === "UNIT") {
      column.width = 12;
    }
    if (headers[id] === "CONTAINER NUMBER") {
      column.width = 30;
    }
    if (headers[id] === "INVOICE VALUE AND UNIT PRICE") {
      column.width = 35;
    }
    if (headers[id] === "IMPORTER") {
      column.width = 40;
    }
    if (headers[id] === "SHIPPING LINE") {
      column.width = 40;
    }
    if (headers[id] === "DESCRIPTION") {
      column.width = 50;
    }
    if (headers[id] === "SIZE") {
      column.width = 10;
    }
    if (headers[id] === "FREE TIME") {
      column.width = 12;
    }
    if (headers[id] === "SUPPLIER/ EXPORTER") {
      column.width = 30;
    }
    if (headers[id] === "STATUS") {
      column.width = 15;
    }
  });

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  /////////////////////////////////////  Additional Table  //////////////////////////////////////
  // Add a new section for the additional table
  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRows([]);

  // Define the content for the additional table
  const additionalTableData = [
    // { color: "FFFFFFFF", text: "" },
    { color: "FFCCFFFF", text: "CUSTOM CLEARANCE COMPLETED" },
    { color: "FF8EAADB", text: "BE NOTED, CLEARANCE PENDING" },
    { color: "f4b083", text: "BE NOTED, ARRIVAL PENDING" },
    { color: "ffff66", text: "SEA IGM FILED" },
    { color: "FFFFFFFF", text: "ESTIMATED TIME OF ARRIVAL" },
    // Add more rows as needed
  ];

  // Loop through the additional table data and add rows to the worksheet
  for (const row of additionalTableData) {
    const additionalTableRow = worksheet.addRow([]);

    // Add an empty cell to the first column
    const firstCell = additionalTableRow.getCell(1);

    // Set background color based on row color
    firstCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: row.color },
    };

    // Add text to the second column
    additionalTableRow.getCell(2).value = row.text;

    // Apply formatting to the entire row
    additionalTableRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Set row height for the additional table rows
    additionalTableRow.height = 20; // You can adjust the height as needed
  }
  worksheet.addRow([]);
  worksheet.addRow([]);

  const summaryRow = worksheet.addRow(["SUMMARY", "", "", "", ""]);
  summaryRow.getCell(1).alignment = {
    horizontal: "center",
    vertical: "middle",
  };
  summaryRow.getCell(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "92D050" },
    font: { color: { argb: "FFFFFF" } },
  };

  worksheet.mergeCells(`A${summaryRow.number}:E${summaryRow.number}`); // Merge cells for the "Summary" row

  const containersWithSize20AndArrival = rows.filter((item) => {
    return item.container_nos.some(
      (container) => container.size === "20" && container.arrival_date
    );
  }).length;

  const containersWithSize40AndArrival = rows.filter((item) => {
    return item.container_nos.some(
      (container) => container.size === "40" && container.arrival_date
    );
  }).length;

  const containersWithSize20AndNoArrival = rows.filter((item) => {
    return item.container_nos.some(
      (container) => container.size === "20" && !container.arrival_date
    );
  }).length;

  const containersWithSize40AndNoArrival = rows.filter((item) => {
    return item.container_nos.some(
      (container) => container.size === "40" && !container.arrival_date
    );
  }).length;

  const totalContainers =
    containersWithSize20AndArrival +
    containersWithSize40AndArrival +
    containersWithSize20AndNoArrival +
    containersWithSize40AndNoArrival;

  // Add the new table with merged cells
  const newTableData = [
    ["20'", "40'", "20'", "40'", ""],
    [
      containersWithSize20AndArrival,
      containersWithSize40AndArrival,
      containersWithSize20AndNoArrival,
      containersWithSize40AndNoArrival,
      totalContainers,
    ],
  ];

  // Get the starting row number for the new table
  const startRow = summaryRow.number + 1; // Adjusted to remove the extra rows

  // Merge cells and apply formatting
  worksheet.addTable({
    name: "SummaryTable",
    ref: `A${startRow}:E${startRow + newTableData.length - 1}`, // Adjusted to match the new data layout
    columns: [
      { name: "ARRIVED" },
      { name: "IN TRANSIT" },
      { name: "TOTAL" },
      { name: "D" },
      { name: "TOTAL" },
    ],
    rows: newTableData,
  });

  for (let row = startRow; row <= startRow + newTableData.length; row++) {
    for (let col = 1; col <= 5; col++) {
      const cell = worksheet.getCell(`${String.fromCharCode(64 + col)}${row}`);
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
      cell.font = {
        color: "#000000",
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }
  }

  // Merge cells and add text for "Arrived" and "In Transit"
  worksheet.mergeCells(`A${startRow}:B${startRow}`); // Merge cells for the "Arrived" text
  const arrivedCell = worksheet.getCell(`A${startRow}`);
  arrivedCell.value = "ARRIVED";
  arrivedCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "8EAADB" },
  };

  worksheet.mergeCells(`C${startRow}:D${startRow}`); // Merge cells for the "In Transit" text
  const inTransitCell = worksheet.getCell(`C${startRow}`);
  inTransitCell.value = "IN TRANSIT";
  inTransitCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "F4B083" },
  };

  const totalCell = worksheet.getCell(`E${startRow}`);
  totalCell.value = "TOTAL";
  totalCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFF04" },
  };

  // Apply red background to the first two cells of the last row
  const lastRow = worksheet.getRow(startRow + newTableData.length);
  for (let col = 1; col <= 2; col++) {
    const cell = lastRow.getCell(col);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "8EAADB" },
    };
  }

  // Apply blue background to the 3rd and 4th cells of the last row
  for (let col = 3; col <= 4; col++) {
    const cell = lastRow.getCell(col);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F4B083" },
    };
  }

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////

  // Generate Excel file
  const excelBuffer = await workbook.xlsx.writeBuffer();

  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Sanitize the importer and detailedStatus for the filename
  const sanitizedImporter = importer.replace(/\./g, "");
  const sanitizedDetailedStatus = detailedStatus.replace(/\./g, "");

  const newFilename =
    sanitizedDetailedStatus === ""
      ? `${sanitizedImporter} - ${status}.xlsx`
      : `${sanitizedImporter} - ${sanitizedDetailedStatus}.xlsx`;

  saveAs(data, newFilename);
};
