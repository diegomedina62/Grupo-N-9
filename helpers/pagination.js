const pagination = (totalItems, limit, parsePage) => {
  const totalPages = Math.ceil(totalItems / limit)
  const nextPage = totalPages - parsePage > 1 ? `${process.env.URL_BASE}transactions?page=${parsePage + 1}` : ''
  const previousPage = parsePage > 0 ? `${process.env.URL_BASE}transactions?page=${parsePage - 1}` : ''

  return {
    totalItems,
    itemsPerPage: limit,
    currentPage: parsePage,
    totalPages,
    previousPage,
    nextPage
  }
}

module.exports = pagination
