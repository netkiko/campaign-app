import React from "react";
import { Table } from "reactstrap";
import { formatDateDMY, formatMoney, isCampaignActive } from "../utils/FEUtils";
import "../App.css";

function CampaignList(props) {
  const filteredCampaignList = props.filteredCampaignList;

  return (
    <section>
      <Table bordered>
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Campaign Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredCampaignList && filteredCampaignList.length > 0 ? (
            filteredCampaignList.map((item, i) => {
              if (new Date(item.startDate) <= new Date(item.endDate)) {
                return (
                  <tr key={i}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{formatDateDMY(item.startDate)}</td>
                    <td>{formatDateDMY(item.endDate)}</td>
                    <td>
                      {isCampaignActive(item.startDate, item.endDate) ? (
                        <>
                          <span className="campaign-status-active" />
                          <span>Active&nbsp;&nbsp;</span>
                        </>
                      ) : (
                        <>
                          <span className="campaign-status-inactive" />
                          <span>Inactive</span>
                        </>
                      )}
                    </td>
                    <td>USD {formatMoney(item.Budget)}</td>
                  </tr>
                );
              }
            })
          ) : (
            <tr>
              <td colSpan="6">NO Campaigns Data to display...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </section>
  );
}

export default CampaignList;
