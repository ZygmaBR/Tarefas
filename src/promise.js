  let showAlerta = new Promise(
    function(resolve, reject) {
     console.log('promise:dentro da promise');
     reject('nao feito!');
    });
  showAlerta.then(function(notAss){
    console.log(notAss);
  });
showAlerta.catch(function(ass){
  console.log(ass);
});
  console.log('fora da promise');
