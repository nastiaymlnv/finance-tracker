export const filterIncomeByAccount = (array) => {
    if (account === "All") {
        return array.filter(item => item.type === "Income");
    }
    else {
        return array.filter(item => item.type === "Income" && item.account === account);
    }
}