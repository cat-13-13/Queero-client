const getInitials = (name, lastName) => {

    const initials = (name && lastName ? name.charAt(0) + lastName.charAt(0) : '').toUpperCase()

    return initials

}

export default getInitials