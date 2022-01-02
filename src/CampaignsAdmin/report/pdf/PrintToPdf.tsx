import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ReportToPrint } from './ReportToPrint';
import { Button } from 'antd';
export const PrintToPdf = (campaign:any ) => {
  
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div style={{ display: 'none'}}>
        <ReportToPrint  props={campaign} ref={componentRef} />
      </div>
      <Button type="primary" onClick={handlePrint}>GENERATE PDF</Button>
    </>
  );
};