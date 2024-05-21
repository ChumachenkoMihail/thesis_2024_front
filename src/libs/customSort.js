//custom sort for jobHistory array

/**
 * sort data with specific values
 * @param [] required
 * @returns []
 */
export default function customSort(data) {
  // Convert the date strings to the "MM/YYYY" format and then create Date objects
  const convertDate = (dateStr) => {
    const dateParts = dateStr?.split(".");
    if (dateParts?.length === 2) {
      return new Date(dateParts[1] + "/" + dateParts[0]);
    } else {
      return new Date(dateStr?.replace(/\./g, "/"));
    }
  };

  // Handle "по н.в." variations by assigning a distant date
  const fireDateValue = (fireDate) => {
    if (
      fireDate?.toLowerCase()?.includes("по н.в") ||
      fireDate?.toLowerCase()?.includes("по н.вр") ||
      fireDate?.toLowerCase()?.includes("н.вр") ||
      fireDate?.toLowerCase()?.includes("по н.вр.")
    ) {
      return new Date("9999-12-31");
    } else {
      return convertDate(fireDate);
    }
  };

  const sortedData = data?.sort((a, b) => {
    const dateA = convertDate(a?.hireDate);
    const dateB = convertDate(b?.hireDate);

    return (
      dateB - dateA || fireDateValue(a?.fireDate) - fireDateValue(b?.fireDate)
    );
  });

  return sortedData;
}
