const input = 23;

// --- PART 1 ---

let ring = 1;
let maxI = 9;
for (let i = 2; i <= 28; i++) {
  console.log(i, ring, maxI - i);

  if (i >= maxI) {
    ring++;
    maxI = i + ring * 8;
  }
}

// 23 7, 0
// 22 6, 1
// 21 5, 2
// 20 4, 1
// 19 3, 0
// 18 2, 1
// 17 1, 2,
// 16 0, 1

// 0, 2, 4, 6 = 1
// 1, 5 = 2
// 3, 7 = 0

// 1, 8, 16, 24, 32,...

// WHY IS THIS SO HARD???
