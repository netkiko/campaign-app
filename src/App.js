import React, { useState, useEffect } from "react";
import { confirmAlertWindow } from "./utils/FEUtils";
import SearchSection from "./components/SearchSection";
import CampaignList from "./components/CampaignList";
import "./App.css";

function App() {
  const [campaignList, setCampaignList] = useState([]);
  const [filteredCampaignList, setFilteredCampaignList] = useState([]);
  const [isNewList, setIsNewList] = useState(true);
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isResetData, setIsResetData] = useState(false);

  // Fetch Previously Saved Campaign List Data (if there's any)
  useEffect(() => {
    if (isNewList) {
      if (localStorage.getItem("campaignList")) {
        const orderedListById = JSON.parse(
          localStorage.getItem("campaignList")
        ).sort((a, b) => a.id - b.id);
        setCampaignList(orderedListById);
        setFilteredCampaignList(orderedListById);
      } else {
        setCampaignList([]);
        setFilteredCampaignList([]);
      }
      setIsNewList(false);
    }
  }, [isNewList]);

  // Setting AddCampaigns function to be accessible from Browser's Console
  useEffect(() => {
    window.AddCampaigns = AddCampaigns;
  });

  // Filter Campaign List by Date Range and/or by Campaign Name
  useEffect(() => {
    function filterCampaignListByDatesAndName() {
      let newFilteredList = [];
      if (searchStartDate && searchEndDate) {
        newFilteredList = campaignList.filter(item => {
          return (
            (new Date(item.startDate) >= new Date(searchStartDate) &&
              new Date(item.startDate) <= new Date(searchEndDate)) ||
            (new Date(item.endDate) >= new Date(searchStartDate) &&
              new Date(item.endDate) <= new Date(searchEndDate))
          );
        });
      }
      if (searchName) {
        if (newFilteredList.length > 0) {
          newFilteredList = newFilteredList.filter(item =>
            item.name.toLowerCase().includes(searchName.toLowerCase())
          );
        } else {
          newFilteredList = campaignList.filter(item =>
            item.name.toLowerCase().includes(searchName.toLowerCase())
          );
        }
      }
      setIsFilter(false);
      setFilteredCampaignList(newFilteredList);
    }
    isFilter && filterCampaignListByDatesAndName();
  }, [isFilter]);

  // Clear all Search Fields and display the unfiltered Campaign List
  useEffect(() => {
    if (isClear) {
      setFilteredCampaignList(campaignList);
      setSearchStartDate("");
      setSearchEndDate("");
      setSearchName("");
      setIsClear(false);
    }
  }, [isClear]);

  // Erases the imported Array of Campaign List saved in Local Storage
  useEffect(() => {
    if (isResetData) {
      localStorage.removeItem("campaignList");
      setSearchStartDate("");
      setSearchEndDate("");
      setSearchName("");
      setIsNewList(true);
      setIsResetData(false);
    }
  }, [isResetData]);

  // Method that imports Array of Campaigns List thru Browser's Console Window
  // The imported data will be stored in LocalStorage
  function AddCampaigns(arrNewCampaigns) {
    const isNewCampaignsAnArray = Array.isArray(arrNewCampaigns);
    if (!isNewCampaignsAnArray) {
      confirmAlertWindow(
        "Invalid Input! Must be a valid Array of Campaigns..."
      );
      return;
    } else {
      let existingCampaignList = [];
      if (localStorage.getItem("campaignList")) {
        existingCampaignList = JSON.parse(localStorage.getItem("campaignList"));
      }
      existingCampaignList = [...existingCampaignList, ...arrNewCampaigns];
      localStorage.setItem(
        "campaignList",
        JSON.stringify(existingCampaignList)
      );
      confirmAlertWindow(
        "New Array of Campaigns Data has been successfully loaded/appended..."
      );
      setIsNewList(true);
    }
  }

  // Handles Date Values and Range Validations
  const handleSearchFieldValidation = () => {
    if (!searchStartDate && !searchEndDate && !searchName) {
      confirmAlertWindow("Please enter values on Search Fields.");
      return;
    }
    if (searchStartDate && !searchEndDate) {
      confirmAlertWindow("Please enter 'Search End Date' value.");
      return;
    }
    if (!searchStartDate && searchEndDate) {
      confirmAlertWindow("Please enter 'Search Start Date' value.");
      return;
    }
    if (searchStartDate && searchEndDate) {
      if (isNaN(Date.parse(searchStartDate))) {
        confirmAlertWindow("Please enter a valid 'Search Start Date' value.");
        return;
      }
      if (isNaN(Date.parse(searchEndDate))) {
        confirmAlertWindow("Please enter a valid 'Search Start Date' value.");
        return;
      }
      if (searchStartDate > searchEndDate) {
        confirmAlertWindow(
          "'Search Start Date' cannot be greater than 'Search End Date'."
        );
        return;
      }
    }
    setIsFilter(true);
  };

  return (
    <section className="campaign-page-wrapper">
      <SearchSection
        searchStartDate={searchStartDate}
        setSearchStartDate={setSearchStartDate}
        searchEndDate={searchEndDate}
        setSearchEndDate={setSearchEndDate}
        searchName={searchName}
        setSearchName={setSearchName}
        handleSearchFieldValidation={handleSearchFieldValidation}
        setIsClear={setIsClear}
        setIsResetData={setIsResetData}
      />
      <CampaignList filteredCampaignList={filteredCampaignList} />
    </section>
  );
}

export default App;
