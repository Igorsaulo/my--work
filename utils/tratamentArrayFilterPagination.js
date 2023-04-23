export function compactToPagination(array, chunkSize) {
  const chunkedArray = [];

  for (let i = 0; i < array?.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

export function descompactFromPagination(getArray) {
  const array = [];
  getArray.map((value) => {
    return value.map((value) => {
      return array.push(value);
    });
  });
  return array;
}
