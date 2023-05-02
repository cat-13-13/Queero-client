const formatDate = (date) => {

    const newDate = date.substring(0, 16)

    const result = newDate.replace('T', ' ')

    return result

}

export default formatDate