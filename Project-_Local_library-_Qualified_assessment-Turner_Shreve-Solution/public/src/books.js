function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

const findBookById = (books, id) => books.find(book => book.id === id)

const partitionBooksByBorrowedStatus = (books) => {
  const borrowedBooks = books.filter(({borrows}) => borrows[0].returned === false);
  const returnedBooks = books.filter(({borrows}) => borrows[0].returned === true);
  return [borrowedBooks, returnedBooks];
}

const getBorrowersForBook = (book, accounts) => {
   const mapArray = book.borrows.map((borrow) => {
   const foundAccount = accounts.find((account) => {
      return borrow.id === account.id
    })
   return {...foundAccount, returned: borrow.returned}
  })
   return mapArray.slice(0, 10)
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
