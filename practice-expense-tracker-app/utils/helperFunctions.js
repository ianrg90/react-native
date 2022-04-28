export const formatDate = (date) => {
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    return year + "-" + month + "-" + day
}

export const formatCurrency = (number) => {
    return "$" + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const getDateMinusDays = (date, days) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}