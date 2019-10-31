import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function formatDateDMY(strDate) {
  // Returns Date in DD/MM/YYYY Format
  if (!strDate) return;
  var varDate = strDate;

  var date = new Date(varDate),
    month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export function formatMoney(
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

export const isCampaignActive = (startDate, endDate) => {
  const currDate = new Date();
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  if (newStartDate <= currDate && newEndDate >= currDate) {
    return true;
  } else {
    return false;
  }
};

export const confirmAlertWindow = strMessage => {
  confirmAlert({
    message: strMessage,
    buttons: [
      {
        label: "OK",
        onClick: () => {}
      }
    ]
  });
};
