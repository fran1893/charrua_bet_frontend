import React from "react";
import "./DataListTable.scss";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

export default function DataListTable({
  data,
  title = "Data",
  headers,
  attributes,
  onChange,
}) {
  return (
    <div className="DataListTable">
      <div style={{ overflowX: "auto" }}>
        <div className="mobileTableTitle">{title}</div>
        <table>
          <thead>
            <tr>
              <th className="table-title-th" colSpan={headers.length}>
                <div className="tableTitle">{title}</div>
              </th>
            </tr>
            <tr className="title-headers">
              {headers.map((th, index) => (
                <th scope="col" key={index}>
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr scope="row" data-data-id={d.id} onClick={onChange} key={d.id}>
                {attributes.map((attr, index) => (
                  <td data-label={headers[index]} key={index}>
                    {d[attr] ? d[attr] : "No definido"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
