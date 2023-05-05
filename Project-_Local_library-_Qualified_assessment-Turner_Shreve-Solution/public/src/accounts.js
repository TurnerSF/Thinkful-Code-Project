const findAccountById = (accounts, id) => accounts.find(account => account.id === id)

const sortAccountsByLastName = (accounts) => accounts.sort((accountA, accountB) => {
  return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
})
                                                           
const getTotalNumberOfBorrows = (account, books) => {
  let total = 0
  books.forEach((book) => {
   total += book.borrows.filter((borrow) => 
      borrow.id === account.id
    ).length  
  })
  
  return total
}



function getBooksPossessedByAccount(account, books, authors) {
  const checkedOutBooks = [];
  for (let book of books) {
    const borrow = book.borrows[0];
    if (borrow.id === account.id && !borrow.returned) {
      const author = authors.find((author) => author.id === book.authorId);
      checkedOutBooks.push({ ...book, author });
    }
  }
  return checkedOutBooks;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

