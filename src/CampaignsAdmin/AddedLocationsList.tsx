import React, { useState } from 'react';
import { List } from 'antd';

export const AddedLocationsList = (...arg: any) => {
  const [data, setData] = useState([]);
  setData(arg);


  return (
    <List
      size="small"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item: string) => <List.Item key={item}>{item}</List.Item>}
    />
  );
};
