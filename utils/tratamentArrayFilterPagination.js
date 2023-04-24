export function compactToPagination(array, chunkSize) {
  const chunkedArray = [];

//user.photos é um array com todas as fotos
  for (let i = 0; i < array?.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }

  return chunkedArray;
}

export function descompactFromPagination(getArray) {  
  console.log(array)
  const array = [];
  getArray.map((value) => {
    return value.map((value) => {
      return array.push(value);
    });
  });
  return array;
}
