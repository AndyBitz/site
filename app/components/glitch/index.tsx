"use client";

import { ReactNode, useEffect, useMemo, useRef } from 'react';
import styles from './glitch.module.css';
import { Perlin } from './perlin';

function getCanvasRatio(ctx: CanvasRenderingContext2D) {
	// Ensure the canvas renders in the correct resolution
	const devicePixelRatio = window.devicePixelRatio || 1;
	// @ts-ignore
	const backingStorePixelRatio: number = ctx.webkitBackingStorePixelRatio
		// @ts-ignore
		|| ctx.mozBackingStorePixelRatio
		// @ts-ignore
		|| ctx.msBackingStorePixelRatio
		// @ts-ignore
		|| ctx.oBackingStorePixelRatio
		// @ts-ignore
		|| ctx.backingStorePixelRatio
		|| 1;

	return {
		devicePixelRatio,
		backingStorePixelRatio,
	};
}

export function Glitch({
	children,
	maxBoxWidthAndHeight,
}: {
	children: ReactNode,
	maxBoxWidthAndHeight?: number,
}) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const spanRef = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		const callbacks: (() => unknown)[] = [];

		const timeout = setTimeout(() => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			const span = spanRef.current;
			if (!span) return;

			const { devicePixelRatio, backingStorePixelRatio } = getCanvasRatio(ctx);

			const style = window.getComputedStyle(span);
			const rect = span.getBoundingClientRect();

			const pixelRatio = devicePixelRatio / backingStorePixelRatio;
			const w = rect.width;
			const h = rect.height;

			// Make the canvas larger than the original container
			// to ensure we can show effects that are out of bounds.
			const oversize = 24;

			canvas.width = (w + oversize) * pixelRatio;
			canvas.height = (h + oversize) * pixelRatio;
			canvas.style.width = (w + oversize) + "px";
			canvas.style.height = (h + oversize) + "px";
			canvas.style.transform = `translate(-${oversize / 2}px, -${oversize / 2}px)`;
			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

			// Set the default text
			if (typeof children === 'string') {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.font = style['font'];
				ctx.fillStyle = '#333';
				ctx.fillText(children, 0 + oversize / 2, rect.height - 8 + oversize / 2);

				// Hide the original text
				span.style.color = 'rgba(0, 0, 0, 0)';
			} else {
				const child = span.children[0];
				if (child.tagName === 'IMG') {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(child as HTMLImageElement, 0 + oversize / 2, 0 + oversize / 2, w, h);
				}
				span.style.opacity = '0';
			}

			const { start, stop } = createAnimation(ctx, {
				maxBoxWidthAndHeight
			});

			start();

			callbacks.push(stop);
		}, 2000);

		return () => {
			clearTimeout(timeout);
			callbacks.forEach(c => c());
		};

	}, [
		children,
		maxBoxWidthAndHeight,
	]);

	const spanStyles = useMemo(() => {
		if (typeof children !== 'string') {
			return {
				display: 'block',
				lineHeight: 0,
			};
		}

		return {};
	}, [children]);

	return (
		<div className={styles.glitch}>
			<span ref={spanRef} style={spanStyles}>
				{children}
			</span>
			<canvas ref={canvasRef} />
		</div>
	);
}

function createAnimation(ctx: CanvasRenderingContext2D, options: {
	maxBoxWidthAndHeight?: number,
}) {
	let stopped = false;
	let start = 0;

	const original = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	const perlin = new Perlin(1337);

	const { devicePixelRatio } = getCanvasRatio(ctx);

	const canvas = ctx.canvas;
	const transform = ctx.getTransform();

	const canvasRed = document.createElement('canvas');
	const canvasGreen = document.createElement('canvas');
	const canvasBlue = document.createElement('canvas');
	canvasRed.width = canvasGreen.width = canvasBlue.width = canvas.width;
	canvasRed.height = canvasGreen.height = canvasBlue.height = canvas.height;

	canvasRed.style.width = canvasGreen.style.width = canvasBlue.style.width = canvas.style.width;
	canvasRed.style.height = canvasGreen.style.height = canvasBlue.style.height = canvas.style.height;

	const ctxRed = canvasRed.getContext('2d');
	const ctxGreen = canvasGreen.getContext('2d');
	const ctxBlue = canvasBlue.getContext('2d');

	if (!ctxRed || !ctxGreen || !ctxBlue) throw new Error('No context');

	ctxRed.setTransform(transform);
	ctxGreen.setTransform(transform);
	ctxBlue.setTransform(transform);


	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;

	let redData = ctx.createImageData(canvas.width, canvas.height);
	let greenData = ctx.createImageData(canvas.width, canvas.height);
	let blueData = ctx.createImageData(canvas.width, canvas.height);

	// Split the color channels
	for (let i = 0; i < data.length; i += 4) {
		redData.data[i] = 255 || data[i];  // Red channel
		greenData.data[i + 1] = 255 || data[i + 1];  // Green channel
		blueData.data[i + 2] = 255 || data[i + 2];  // Blue channel
		redData.data[i + 3] = greenData.data[i + 3] = blueData.data[i + 3] = data[i + 3];
	}

	let lastChromaticAberration = 0;
	let chromaticState: 'chromatic' | 'clear' = 'chromatic';
	let chromaticChange = 300;

	let lastDisplacement = 0;
	let displacementState: 'displacement' | 'clear' = 'displacement';
	let displacementChange = 200;

	let opSince = 0;
	let noopFor = 1000;
	let noopSince = 0;
	let noopState = true;

	const animate = (time: number) => {
		if (stopped) return;
		if (start === 0) start = time;

		const elapsed = time - start;

		if (noopState) {
			if (time - noopSince > noopFor) {
				opSince = time;
				noopState = false;
			}

			return requestAnimationFrame(animate);
		}

		// Chromatic aberration
		if (time - lastChromaticAberration > chromaticChange) {
			lastChromaticAberration = time;

			if (chromaticState === 'chromatic') {
				lastChromaticAberration = time;

  				ctx.clearRect(0, 0, canvas.width, canvas.height);

				ctxRed.putImageData(redData, 0, 0);
				ctxGreen.putImageData(greenData, 0, 0);
				ctxBlue.putImageData(blueData, 0, 0);

  				ctx.globalCompositeOperation = 'lighter';

				const invert = perlin.noise(1 / 100, elapsed) > 0 ? -1 : 1;
				const x = (2 * invert) + perlin.noise(2 / 100, elapsed) * 10;
				const y = (-2 * invert) + perlin.noise(-2 / 100, elapsed) * 10;

  				ctx.drawImage(canvasRed, x, y, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
  				ctx.drawImage(canvasGreen, 0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
  				ctx.drawImage(canvasBlue, -x, -y, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);

				chromaticState = Math.random() > .5 ? 'chromatic' : 'clear';
				chromaticChange = Math.floor(Math.random() * 200);
			} else if (chromaticState === 'clear') {
  				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.putImageData(original, 0, 0);

				chromaticState = Math.random() > .8 ? 'chromatic' : 'clear';
				chromaticChange = Math.floor(Math.random() * 1000);
			}
		}

		// Displacement
		if (time - lastDisplacement > displacementChange) {
			lastDisplacement = time;

			if (displacementState === 'displacement') {
				const normalize = (value: number) => (value + 1) / 2;

				const maxBoxWidth = options.maxBoxWidthAndHeight ?? 30;
				const maxBoxHeight = options.maxBoxWidthAndHeight ?? 30;

				for (let i = 0; i < Math.floor((Math.random() + 1) * 16); i++) {
					const x = Math.floor(elapsed % canvas.width);
					const y = Math.floor(elapsed % canvas.height);

					const cutout = {
						x: x + perlin.noise(x / 100, y / 100) * 10,
						y: y + perlin.noise(y / 100, x / 100) * 10,
						width: normalize(perlin.noise(y / 100, x / 100)) * maxBoxWidth,
						height: normalize(perlin.noise(x / 100, y / 100)) * maxBoxHeight,
					};

					const target = {
						x: Math.floor(cutout.x + perlin.noise((cutout.x + 50) / 100, (cutout.y + 50) / 100) * 10),
						y: Math.floor(cutout.y + perlin.noise((cutout.y + 50) / 100, (cutout.x + 50) / 100) * 10),
					};

					const imageData = ctx.getImageData(cutout.x, cutout.y, cutout.width, cutout.height);
					ctx.clearRect(cutout.x, cutout.y, cutout.width, cutout.height);
					ctx.putImageData(imageData, target.x, target.y);
				}

				// For now, we just let the chromatic abberation clear the state
				// displacementState = Math.random() > .5 ? 'displacement' : 'clear';
				// displacementChange = Math.floor(Math.random() * 300);
			} else if (displacementState === 'clear') {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.putImageData(original, 0, 0);
			}
		}

		// Animation must run for at least 3s before
		// going back into a no-op state.
		if (time - opSince > 3000 && Math.random() > .2) {
			noopState = true;
			noopSince = time;
			noopFor = Math.floor(Math.random() * 8_000);

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.putImageData(original, 0, 0);
		}

		requestAnimationFrame(animate);
	};

	return {
		stop: () => {
			stopped = true;
		},
		start: () => {
			requestAnimationFrame(animate);
		},
	};
}
