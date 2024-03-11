import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import {PickerLocale} from "antd/lib/date-picker/generatePicker";
import TimePickerLocale from "antd/lib/time-picker/locale/ru_RU";
export const localeRU: PickerLocale = {
    lang: {
        placeholder: 'Выберите дату',
        yearPlaceholder: 'Выберите год',
        quarterPlaceholder: 'Выберите квартал',
        monthPlaceholder: 'Выберите месяц',
        weekPlaceholder: 'Выберите неделю',
        rangePlaceholder: ['Начальная дата', 'Конечная дата'],
        rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
        rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
        rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    }
};
