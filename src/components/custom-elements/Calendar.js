import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';

const Calendar = ({ value, name, onChange }) => {
   const handleDateChange = (date, name) => {
      onChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name, type: 'calendar' } });
   };

   return (
      <DatePicker selected={value ? new Date(value) : undefined} onChange={(date) => handleDateChange(date, name)} dateFormat="P" />
   );
}

export default Calendar;
