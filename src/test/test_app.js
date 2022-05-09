let mail = "tom.ami@etu.univ-amu.fr";
let arr = mail.split("@");
let first = arr[0];
let nameettout = first.split(".");
let prenom = nameettout[0];
let nom = nameettout[1];

console.log(prenom);
console.log(nom);