'use client';

import { DateRange, RangeKeyDict, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalendarProps {
    disabledDates?: Date[],
    onChange: (value: RangeKeyDict) => void,
    value: Range,
}

const Calendar: React.FC<CalendarProps> = ({ disabledDates, onChange, value }) => {
    return (
        <DateRange 
            rangeColors={['#262626']}
            ranges={[value]}
            onChange={onChange}
            date={new Date()}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    )
}

export default Calendar;