//resolved

const resProm = new Promise ((resolve,reject) => {
    setTimeout(() => {
        let mrkr = true;
        if(mrkr){
            resolve("Promise resolved!");
        }else{
            reject("Promise rejected!")
        }
    },2000);
});

resProm
  .then(result => console.log(result))
  .catch(error => console.error(error));


//rejected

const resProm2 = new Promise ((resolve,reject) => {
    setTimeout(() => {
        let mrkr = false;
        if(mrkr){
            resolve("Promise resolved!");
        }else{
            reject("Promise rejected!")
        }
    },2000);
});

resProm2
  .then(result => console.log(result))
  .catch(error => console.error(error));