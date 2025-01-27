/* 
== เท่ากับ
!= ไม่เท่ากับ
> มากกว่า
< น้อยกว่า
>= มากกว่าเท่ากับ
<= น้อยกว่าเท่ากับ
*/ 
/* 
>= 80 เป็นเกรด  A
>= 70 เป็นเกรด B
>= 60 เป็นเกรด C
>= 50 เป็นเกรด D
*/ 
let score = prompt('Enter your score: ');
console.log('your score is ' + score);

//if - else condition
if (score >= 80) {
    console.log('you are grade A');
} else if (score >= 70 ) { // false
    console.log('you are grade B');
} else if (score >= 60 ){  // true
    console.log('you are grade C');
}  else if (score >= 50 ) {
    console.log('you are grade D');
} else {
    console.log('you are grade F');}

/* 
while loop
for
*/ 
let count = 0;

console.log("while loop");

while (counter <= 10) { // true เช็คเงื่อนไข ถ้าเป็นจริง ถึงจะทำ
    console.log('while loop');
    count = counter + 1;
    counter+=1
    counter++
}

for (let counter = 0; counter < 10; counter = counter + 1) {
    console.log('for loop');
}



let age1 = 20;
let age2 = 30;
let age3 = 40;
let age4 = 50;
console.log(age1, age2, age3, age4);

let ages = [30, 35, 40, 45, 50];
/* if (!ages.includes(40)) {
    console.log('you have to be 40');
} 
*/

console.log(ages);
ages.sort();
console.log(ages);

let names_list = ['John', 'Bob', 'Alice', 'Mary'];
names_list.push('Mike');
console.log(names_list.length);
console.log(names_list[0]);
console.log(names_list[1]);
console.log(names_list[2]);

for (let index = 0; index < names_list.length; index++); {
    console.log('name list',names_list[index]);
}
/* 
array
*/
let scores = [10, 20, 30, 40, 50];
for (let index = 0; index < scores.length; index++) {
    console.log(scores[index]);
}

/*
scores[0] = scores[0] * 2 ;
scores[1] = scores[1] * 2 ;
scores[2] = scores[2] * 2 ;
scores[3] = scores[3] * 2 ;
scores[4] = scores[4] * 2 ;
*/
scores = scores.map((s) => {
    return s * 2 ;
});

scores.forEach((s) => {
console.log('new scores: ', s)
})

