import React, { useState } from 'react';

export const DueDateStatus = (...props:any) => {
  const [dueDate, setDueDate] = useState<Date>(props.reportDueDate);

  const todayDate = new Date();

  const date2 = new Date(dueDate);

  return todayDate < date2 ? <span>ON TIME</span> : <span>OVERDUE</span>;
};
