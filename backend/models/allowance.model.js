class Allowance {
    create = (name, desc, amount, status) => {
        return {
            name: name,
            description: desc,
            amount: amount,
            status: status
        }
    }
}

export default Allowance