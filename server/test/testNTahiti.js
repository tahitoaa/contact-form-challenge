
var {v, NTahitiRegex} = require('../data/validators.js');

const nOK = [
  "T01234",
  "Ta1234",
  "TA1234",
]
const nKO = [
  "",
  "123456",
  "abcdefg",
  "T",
  "T123456",
  "Taaaaa",
]

const test = function () {
  const OKs = nOK.map(s => {
    const res = s.match(NTahitiRegex);
    console.log(`${s} expect OK : ${res ? "OK" : "KO"}`);
    return res;
  }).find(r => {return (r == null);});

  const KOs = nKO.map(s => {
      const res = s.match(NTahitiRegex);
      console.log(`${s} expect KO : ${res == null ? "KO" : "OK"}`);
      return s.match(NTahitiRegex) == null; }
      ).find(r => {return ! r;});
  return (KOs == undefined) && ( OKs == undefined) ;
}

const res = test();
console.log(" ** Test NTahiti pattern matching : " + (res ? "OK" : "KO"));
