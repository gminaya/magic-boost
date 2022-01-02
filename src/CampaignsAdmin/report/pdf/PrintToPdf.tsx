import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ReportToPrint } from './ReportToPrint';

export const PrintToPdf = (campaign:any ) => {
  
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div >
        <ReportToPrint props={campaign} ref={componentRef} />
      </div>
      <button onClick={handlePrint}>Print this out!</button>
    </>
  );
};