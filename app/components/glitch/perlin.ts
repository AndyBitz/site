
export class Perlin {
	private seed: number;
	private permutation: Uint8Array;
	private gradientX: Float32Array;
	private gradientY: Float32Array;

	constructor(seed: number) {
		this.seed = seed;
		this.permutation = new Uint8Array(512);
		this.gradientX = new Float32Array(512);
		this.gradientY = new Float32Array(512);
		let random = this.seededRandom(seed);
		for (let i = 0; i < 256; i++) {
			this.permutation[i] = this.permutation[i + 256] = random() * 256;
			this.gradientX[i] = this.gradientX[i + 256] = random() * 2 - 1;
			this.gradientY[i] = this.gradientY[i + 256] = random() * 2 - 1;
		}
	}

	seededRandom(seed: number) {
		let x = Math.sin(seed) * 10000;
		return () => (x - Math.floor(x));
	}

	noise(x: number, y: number) {
		let xi = Math.floor(x) & 255;
		let yi = Math.floor(y) & 255;
		let g1 = this.permutation[xi + this.permutation[yi]];
		let g2 = this.permutation[xi + 1 + this.permutation[yi]];
		let g3 = this.permutation[xi + this.permutation[yi + 1]];
		let g4 = this.permutation[xi + 1 + this.permutation[yi + 1]];
		let xf = x - Math.floor(x);
		let yf = y - Math.floor(y);
		let d1 = this.gradientX[g1] * xf + this.gradientY[g1] * yf;
		let d2 = this.gradientX[g2] * (xf - 1) + this.gradientY[g2] * yf;
		let d3 = this.gradientX[g3] * xf + this.gradientY[g3] * (yf - 1);
		let d4 = this.gradientX[g4] * (xf - 1) + this.gradientY[g4] * (yf - 1);
		let xfade = this.fade(xf);
		let yfade = this.fade(yf);
		let xa = this.lerp(d1, d2, xfade);
		let xb = this.lerp(d3, d4, xfade);
		return this.lerp(xa, xb, yfade);
	}

	lerp(a: number, b: number, x: number) {
		return a + x * (b - a);
	}

	fade(t: number) {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}
}
