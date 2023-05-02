const cutString = (data, limit) => {

    const result = data.length > limit ? `${data.substring(0, 20)}...` : data

    return result

}

export default cutString