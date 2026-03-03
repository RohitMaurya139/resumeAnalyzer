import React, { useState } from "react";
import { ReportContext } from "./report-context";



export const ReportProvider = ({ children }) => {
  const [report, setReport] = useState(null);

  return (
    <ReportContext.Provider value={{ report, setReport }}>
      {children}
    </ReportContext.Provider>
  );
};
