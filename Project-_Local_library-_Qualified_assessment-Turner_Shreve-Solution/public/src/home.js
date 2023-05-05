const getTotalBooksCount = (books) => {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

const getBooksBorrowedCount = (books) => {
  const borrowedBooksArray = books.filter((book) => book.borrows[0].returned === false)
  return borrowedBooksArray.length
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre]++;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  const sortedGenres = Object.keys(genreCounts).sort((genreA, genreB) => {
    return genreCounts[genreB] - genreCounts[genreA];
  });

  return sortedGenres.slice(0, 5).map((genre) => ({
    name: genre,
    count: genreCounts[genre],
  }));
}


function getMostPopularBooks(books) {
  const borrowCounts = books.reduce((acc, { borrows, title }) => {
    acc[title] = borrows.length;
    return acc;
  }, {});

  const sortedBooks = Object.keys(borrowCounts).sort(
    (bookA, bookB) => borrowCounts[bookB] - borrowCounts[bookA]
  );

  return sortedBooks.slice(0, 5).map((title) => ({
    name: title,
    count: borrowCounts[title],
  }));
}

function getMostPopularAuthors(books, authors) {
  const topAuthors = {};

  books.forEach(book => {
    const author = authors.find(author => author.id === book.authorId);
    if (!topAuthors[author.id]) {
      topAuthors[author.id] = {
        name: `${author.name.first} ${author.name.last}`,
        count: 0
      };
    }
    topAuthors[author.id].count += book.borrows.length;
  });

  
  const authorGroup = Object.values(topAuthors);

  
  authorGroup.sort((author1, author2) => author2.count - author1.count);
  return authorGroup.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
