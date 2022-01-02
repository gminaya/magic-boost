import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ReportToPrint } from './ReportToPrint';
import { Button } from 'antd';
import { PrintToPdfProps } from './Models';

export const PrintToPdf = ({campaign}: PrintToPdfProps) => {  
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div style={{ display: 'none'}}>
        <ReportToPrint campaign={campaign} ref={componentRef} />
      </div>
      <Button type="primary" onClick={handlePrint}>GENERATE PDF</Button>
    </>
  );
};