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
// please git push of these are required so please git push these all the folders
// because i were not git push because of network issue?
// review the Js that you've learned now?
