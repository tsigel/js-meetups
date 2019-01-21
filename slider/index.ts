const arr = [
  {
    id: 1,
    isActive: true
  },
  {
    id: 2,
    isActive: true
  },
  {
    id: 3,
    isActive: false
  }
] as ISome[];

interface ISome {
  id: number;
  isActive: boolean;
}

arr.find(item => item.id === 2);
// _.where({id: 2}, arr);

const data = {
  a: 1,
  b: 2
}; // [['a', 1], ['b', 2]]

const where = <T>(data: Partial<T>, list: Array<T>): Array<T> => {
  return list.filter(item =>
    Object.entries(data).every(([key, value]) => {
      return item[key] === value;
    })
  );
};

Object.entries = function(data) {
  return Object.keys(data).map(name => [name, data[name]]);
} as any;

// console.log(where({ id: 1, isActive: true }, arr));

const sum = (a, b, c, d) => a + b + c + d;

const curry = (cb: Function, n?: number) => {
    const args = [];
    const len = cb.length;

    return function loop() {
        const localArgs = Array.prototype.slice.call(arguments);
        args.push(...localArgs);
        if (args.length >= len) {
            return cb(...args);
        } else {
            return loop;
        }
    }
}

const c: any = curry(sum);
const c2: any = curry(sum);

const uncurry = (cb: Function, n: number) => {
    if (!n) {
        throw new Error('n must be')
    }

    return function (...args) {
        if (args.length !== n) {
            throw new Error('Wrong arguments count!');
        }

        return args.reduce((acc, param) => {
            return acc(param);
        }, cb);
    }
}

const c3: any = uncurry(curry(sum), 4);

console.log(c2(1)(2)(3)(4));
console.log(c(1)(2, 3)(4));
console.log(c3(1, 2, 3, 4));

