const convertDate = (dateString) => {

    dateString = dateString.split(/[-T.]+/)
    dateString.pop()
    const convertedDate = `${dateString[1]}-${dateString[2]}-${dateString[0]} @ ${dateString[3]}`

    return convertedDate
}

export default convertDate