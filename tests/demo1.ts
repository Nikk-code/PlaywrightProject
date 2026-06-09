let message1 : string = "Hello";
message1 = "bye";
console.log(message1);
let age1:number = 20;
console.log(age1);
let isActive : boolean = false;
let numberArray : number[] = [1,2,3];

let data : any = "this could be anything";

data = 42;

function sum(a:number,b:number):number{
    return a+b;
}

sum(3,4);

let user:{name: string, age:number,location:string} = {name: "Bob", age:34, location:"delhi"};
user.location = "Mumbai"