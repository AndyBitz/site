export function bufferToString(input: ArrayBuffer) {
	return btoa(
		new Uint8Array(input)
			.reduce((data, byte) => data + String.fromCharCode(byte), '')
	);
}

export function stringToBuffer(input: string) {
	const binaryString = atob(input);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
}
