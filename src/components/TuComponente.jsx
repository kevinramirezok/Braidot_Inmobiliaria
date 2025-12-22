import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = (props) => {
  return (
    <DatePicker
      {...props}
      popperContainer={({ children }) => <div style={{ zIndex: 2000 }}>{children}</div>}
    />
  );
};

export default MyDatePicker;