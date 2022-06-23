import moment from 'moment'

export const getDatesByYearAndMonth = (year, month) => {
    const mindate = moment([year, month]).format("YYYY-M-D");
    const maxdate = moment(mindate).clone().endOf("month").format("YYYY-M-D");

    return { mindate, maxdate }
}

export const getYearSelect = () => {
    const year = moment().year()
    const years = Array.from(new Array(20), (_val, index) => index + year)
    return years
}

export const convertListDate = (list, field) => {
    return list.map(item => {
        return {
            ...item,
            [field]: moment(item[field]).format("YYYY-MM-DD")
        }
    })
}