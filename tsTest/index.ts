// ==================== 1. 数字枚举（默认）====================
enum Color {
  Red,    // 默认值 0
  Green,  // 默认值 1
  Blue,   // 默认值 2
}



// 使用枚举
const myColor: Color = Color.Green;
console.log('数字枚举值:', myColor);          // 输出: 1
console.log('数字枚举名称:', Color[1]);        // 输出: 'Green'

// ==================== 2. 自定义数字枚举 ====================
enum Status {
  Pending = 100,
  Active = 200,
  Inactive = 300,
  Deleted = 400,
}
type test = 100 | 200 | 300 | 400;

interface params {
    num: number;
    status: Status;
}

const obj: params = {
    num: 1,
    status: Status.Active,
}

console.log('自定义枚举值:', Status.Active);    // 输出: 200
console.log(Status.Active === 200);    // 输出: 'Active'
console.log(typeof Status.Active);  

// ==================== 3. 字符串枚举 ========================
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

const go: Direction = Direction.Up;
console.log('字符串枚举:', go);                // 输出: 'UP'

// ==================== 4. 异构枚举（不推荐）===================
enum MixedEnum {
  No = 0,
  Yes = 'YES',
}

// ==================== 5. const 枚举（编译时优化）===============
const enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
}

// const 枚举只能在编译时使用
const day = Weekday.Monday;

// ==================== 6. 枚举作为类型 ========================
function printColor(color: Color) {
  console.log('Color:', Color[color]);
}

printColor(Color.Red);  // 输出: Color: Red

// ==================== 7. 枚举成员类型 ========================
enum Shape {
  Circle,
  Square,
}

// 特定枚举成员可以作为类型
let circle: Shape.Circle = Shape.Circle;
// circle = Shape.Square;  // ❌ 错误：类型不匹配

// ==================== 8. 反向映射 ==========================
// 数字枚举支持反向映射（字符串枚举不支持）
console.log(Color[Color.Red]);   // 输出: 'Red'
console.log(Color[0]);           // 输出: 'Red'

// ==================== 注意事项 ==============================
// 1. 枚举会生成真实的 JavaScript 对象
// 2. const 枚举不会生成对象，只在编译时替换值
// 3. 字符串枚举不支持反向映射
// 4. 枚举值可以比较
console.log(Color.Red === 0);          // true
console.log(Status.Pending === 100);   // true