// async await usage and promise
async function myfun(dataI) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(dataI);
      resolve("Success");
    }, 2000);
  });
}

myfun("Raham");
