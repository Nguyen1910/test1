const func = () => {
  const arr = [2, 3, 1, 1, 4];
  let i = 0;

  while (i < arr.length - 1) {
    const temp = arr[i];
    i = i + temp;
  }
  if (i === arr.length - 1) {
    return true;
  }
  return false;
};
