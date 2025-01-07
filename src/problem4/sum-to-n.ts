// complexity O(1)
function sum_to_n_b(n: number): number {
	return (n * (n + 1)) / 2;
}

// complexity O(n)
function sum_to_n_a(n: number): number {
	let sum = 0;

	for (let i = 0; i <= n; i++) {
		sum += i;
	}

	return sum;
}

// complexity O(n)
function sum_to_n_c(n: number): number {
	if (n === 1) return 1;
	return n + sum_to_n_c(n - 1);
}

const n = 100;

console.log(`[O(n)] sum from 1 to ${n} using for loop ):`, sum_to_n_a(n));

console.log(
	`[O(1)] sum from 1 to ${n} using mathematic formular:`,
	sum_to_n_b(n),
);

console.log(`[O(n)] sum from 1 to ${n} using recursive:`, sum_to_n_c(n));
