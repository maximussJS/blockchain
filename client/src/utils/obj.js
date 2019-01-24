export const itemHeader = {
    master : 'FROM ',
    whom : 'TO',
    time: 'TIME',
    amount: 'MONEY'
}

export const getLimit = () => {
    let age = []
    for(let i = 6; i < 65; i++) age.push(i)
    return age
}