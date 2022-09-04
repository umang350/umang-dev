export const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

export const kebabArray = (arr: any[]) => arr.map((item) => kebabCase(item));

export const randomNumberText = (finalNum: string, setNumber: (arg0: string) => void) => {
  let count = 0;
  let newNum = "";
  if(isNaN(Number(finalNum))) {
    
    setNumber(finalNum);
    return;
  }
  const interval = setInterval(() => {
    count++;
    for (let i = 0; i < (finalNum ? finalNum?.length : 7); i++) {
      newNum += Math.floor(Math.random() * 10);
    }
    setNumber(newNum);
    newNum = "";
    if (count === 20) {
      clearInterval(interval);

      setNumber(finalNum);
    }
  }, 80);
};
