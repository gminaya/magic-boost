import { Tag } from 'antd';
import React, { useMemo } from 'react';

interface DateLabelProps {
  date?: string;
}

export const DueDateLabel = ({ date }: DateLabelProps) => {
  const today = useMemo(() => new Date(), []);

  if (!date) {
    return <Tag color="geekblue">UNKNOW</Tag>;
  }

  const formatedDueDate = new Date(date);
  return today < formatedDueDate ? <Tag color="green">ON TIME</Tag> : <Tag color="volcano">OVERDUE</Tag>;
};
