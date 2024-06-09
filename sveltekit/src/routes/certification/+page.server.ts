import { readSingleton, createItem, readItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { PDFDocument, rgb } from 'pdf-lib';
import QRCode from 'qrcode';
import { createHmac } from 'crypto';
import { TextEncoder } from 'util';
import { env } from '$env/dynamic/public';
import { v4 as uuidv4 } from 'uuid';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const directus = getDirectusInstance(fetch);

	return {
		settings: await directus.request(readSingleton('certification')),
		course: await directus.request(readItem('Courses', url.searchParams.get('course')))
	};
};

const privateKey = process.env.PRIVATE_KEY; // Securely access the private key

export const actions = {
	default: async ({ request, fetch, url }) => {
		const directus = getDirectusInstance(fetch);
		const formData = await request.formData();
		const userName = formData.get('name');
		const courseID = url.searchParams.get('course');

		const response = await directus.request(readItem('Courses', courseID));

		const courseName = response.Title;

		if (!userName || !courseName) {
			return fail(400, { error: 'Missing userName or courseName' });
		}

		// Step 1: Fetch the template PDF from the backend
		const templateUrl = `${env.PUBLIC_APIURL}/assets/5fb94eb1-8ca8-44e8-8df7-b559533f4dcd.pdf`;
		const existingPdfBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());
		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const page = pdfDoc.getPages()[0];
		const { width, height } = page.getSize();

		// Step 2: Add text to the PDF
		page.drawText(`This is to certify that`, {
			x: 50,
			y: height - 100,
			size: 20,
			color: rgb(0, 0, 0)
		});
		page.drawText(`${userName}`, { x: 50, y: height - 150, size: 25, color: rgb(0, 0, 1) });
		page.drawText(`has successfully completed the course`, {
			x: 50,
			y: height - 200,
			size: 20,
			color: rgb(0, 0, 0)
		});
		page.drawText(`${courseName}`, { x: 50, y: height - 250, size: 25, color: rgb(0, 0, 1) });

		// Step 3: Create a unique certificate ID and digital signature
		const certificateId = uuidv4();
		const certificateData = JSON.stringify({ userName, courseName, certificateId });
		const encoder = new TextEncoder();
		const signature = createHmac('sha256', privateKey)
			.update(encoder.encode(certificateData))
			.digest('hex');

		await directus.request(
			createItem('certificates', {
				id: certificateId,
				signature: signature
			})
		);

		// Step 5: Encode data and signature in URL
		const encodedData = encodeURIComponent(btoa(certificateData));
		const verificationUrl = `${env.PUBLIC_URL}/verify?data=${encodedData}&signature=${signature}`;

		console.log('Verification URL:', verificationUrl);

		// Step 6: Generate QR code
		const qrCodeImageUrl = await QRCode.toDataURL(verificationUrl);
		const qrImage = await pdfDoc.embedPng(qrCodeImageUrl);
		const qrDims = qrImage.scale(0.5);

		// Step 7: Add QR code to the PDF
		page.drawImage(qrImage, {
			x: width - qrDims.width - 50,
			y: 50,
			width: qrDims.width,
			height: qrDims.height
		});

		// Step 8: Serialize the PDF document to bytes
		const pdfBytes = await pdfDoc.save();

		// Prepare FormData for the upload
		const formDataUpload = new FormData();
		formDataUpload.append('title', `certificate-${certificateId}`);
		formDataUpload.append(
			'file',
			new Blob([pdfBytes], { type: 'application/pdf' }),
			`certificate-${certificateId}.pdf`
		);

		let fileURL = '';
		// Perform the upload
		try {
			const response = await fetch('http://directus:8055/files', {
				method: 'POST',
				body: formDataUpload
			});

			const result = await response.json();

			fileURL = `${env.PUBLIC_APIURL}/assets/${result.data.id}`;
		} catch (error) {
			console.error('Error uploading PDF to Directus:', error);
			return fail(500, { error: 'Failed to provide download link' });
		}

		return redirect(303, fileURL);
	}
};
