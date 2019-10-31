import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function SearchSection(props) {
  const {
    searchStartDate,
    setSearchStartDate,
    searchEndDate,
    setSearchEndDate,
    searchName,
    setSearchName,
    handleSearchFieldValidation,
    setIsClear,
    setIsResetData
  } = props;

  const handleResetData = () => {
    confirmAlert({
      message: "Are you sure you want to erase the saved Campaigns List.",
      buttons: [
        {
          label: "Yes",
          onClick: () => setIsResetData(true)
        },
        {
          label: "No",
          onClick: () => setIsResetData(false)
        }
      ]
    });
  };

  return (
    <section className="search-page-wrapper">
      <div className="d-flex" style={{ width: "83%" }}>
        <FormGroup style={{ marginLeft: "10px" }}>
          <Label for="searchStartDate">Start Date</Label>
          <Input
            type="date"
            name="searchStartDate"
            id="searchStartDate"
            value={searchStartDate}
            onChange={e => setSearchStartDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup style={{ marginLeft: "10px" }}>
          <Label for="searchEndDate">End Date</Label>
          <Input
            type="date"
            name="searchEndDate"
            id="searchEndDate"
            value={searchEndDate}
            onChange={e => setSearchEndDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup style={{ marginLeft: "10px" }}>
          <Label for="searchName">Campaign Name</Label>
          <Input
            type="text"
            name="searchName"
            id="searchName"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            placeholder="Search by Name"
          />
        </FormGroup>
        <FormGroup
          className="d-flex align-items-end"
          style={{ marginLeft: "10px" }}
        >
          <Button
            color="primary"
            className="buttonFilter"
            onClick={handleSearchFieldValidation}
          >
            Filter List
          </Button>
        </FormGroup>
        <FormGroup
          className="d-flex align-items-end"
          style={{ marginLeft: "10px" }}
        >
          <Button
            color="secondary"
            className="buttonClear"
            onClick={() => setIsClear(true)}
          >
            Clear Filters
          </Button>
        </FormGroup>
      </div>
      <div className="d-flex justify-content-end" style={{ width: "17%" }}>
        <FormGroup
          className="d-flex align-items-end"
          style={{ marginRight: "10px" }}
        >
          <Button
            color="success"
            className="buttonReset"
            onClick={handleResetData}
          >
            Reset Campaigns Data
          </Button>
        </FormGroup>
      </div>
    </section>
  );
}

export default SearchSection;
