import { AsnParser } from '@peculiar/asn1-schema';
import { ECDSASigValue } from '@peculiar/asn1-ecc';

/**
 * Takes the signature created by `navigator.credentials.get` and
 * converts it to a proper signature that can be used.
 *
 * See https://www.w3.org/TR/webauthn-2/#sctn-signature-attestation-types
 * From https://github.com/MasterKale/SimpleWebAuthn/blob/master/packages/server/src/helpers/iso/isoCrypto/unwrapEC2Signature.ts
 */
export async function unwrapEC2Sig(signature: ArrayBufferLike) {
	// @ts-expect-error
	const parsedSignature = AsnParser.parse(signature, ECDSASigValue);
	let rBytes = new Uint8Array(parsedSignature.r);
	let sBytes = new Uint8Array(parsedSignature.s);

	if (shouldRemoveLeadingZero(rBytes)) {
	  rBytes = rBytes.slice(1);
	}

	if (shouldRemoveLeadingZero(sBytes)) {
	  sBytes = sBytes.slice(1);
	}

	const finalSignature = Buffer.concat([rBytes, sBytes]);

	return finalSignature;
}

function shouldRemoveLeadingZero(bytes: Uint8Array) {
	return bytes[0] === 0x0 && (bytes[1] & (1 << 7)) !== 0;
}
