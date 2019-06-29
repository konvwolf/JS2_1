"use strict";

let test2 = [
    {a: 1, b: 2},
    {c: '1', d: '2',
        e: [3, 4]}
    ];

let [{a, b}, {c, d, e: [f, j]}] = test2;

console.log(`${a} ${b} ${c} ${d} ${f} ${j}`);