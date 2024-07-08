import { readSingleton, createItem, readItem, uploadFiles } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { PDFDocument, rgb } from 'pdf-lib';
import QRCode from 'qrcode';
import { createHmac } from 'crypto';
import { TextEncoder } from 'util';
import { env } from '$env/dynamic/private';
import { env as envPub } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const directus = getDirectusInstance(fetch);

	return {
		settings: await directus.request(readSingleton('certification')),
		course: await directus.request(readItem('Courses', url.searchParams.get('course')))
	};
};

export const actions = {
	default: async ({ request, fetch, url }) => {
		const directus = getDirectusInstance(fetch);
		const formData = await request.formData();
		const userName = formData.get('name');
		const courseID = url.searchParams.get('course');

		const response = await directus.request(readItem('Courses', courseID));

		const settings = await directus.request(readSingleton('certification'));

		const courseName = response.Title;

		if (!userName || !courseName) {
			return fail(400, { error: 'Missing userName or courseName' });
		}

		// Step 1: Fetch the template PDF from the backend
		const templateUrl = `${env.PRIVATE_APIURL}/assets/${settings.template}.pdf`;

		let existingPdfBytes;

		try {
			const response = await fetch(templateUrl);
			existingPdfBytes = await response.arrayBuffer();
		} catch (error) {
			console.error('Error fetching PDF template:', error);
			return fail(500, { error: 'Failed to fetch PDF template' });
		}

		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const page = pdfDoc.getPages()[0];
		const { height } = page.getSize();

		// Step 2: Add text to the PDF
		page.drawText(`${userName}`, {
			x: settings.username_x,
			y: height - settings.username_y,
			size: 164,
			color: rgb(22 / 256, 93 / 256, 177 / 256)
		});
		page.drawText(`${courseName}`, {
			x: settings.coursename_x,
			y: height - settings.coursename_y,
			size: 96,
			color: rgb(0, 0, 0)
		});

		// Step 3: Create a unique certificate ID and digital signature
		const certificateId = crypto.randomUUID();
		const certificateData = JSON.stringify({ userName, courseName, certificateId });
		const encoder = new TextEncoder();
		const privateKey = env.PRIVATE_KEY;
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
		const verificationUrl = `${envPub.PUBLIC_URL}/verify?data=${encodedData}&signature=${signature}`;

		console.log('Verification URL:', verificationUrl);

		// Step 6: Generate QR code
		const qrCodeImageUrl = await QRCode.toDataURL(verificationUrl);
		const qrImage = await pdfDoc.embedPng(qrCodeImageUrl);
		const qrDims = qrImage.scale(2);

		// Step 7: Add QR code to the PDF
		page.drawImage(qrImage, {
			x: settings.qrcode_x,
			y: height - qrDims.height - settings.qrcode_y,
			width: qrDims.width,
			height: qrDims.height
		});

		// Step 8: Serialize the PDF document to bytes
		const pdfBytes = await pdfDoc.save();

		const certificateFileId = crypto.randomUUID();

		// Prepare FormData for the upload
		const formDataUpload = new FormData();
		formDataUpload.append('title', `certificate-${certificateId}`);
		formDataUpload.append('id', certificateFileId);
		formDataUpload.append(
			'file',
			new Blob([pdfBytes], { type: 'application/pdf' }),
			`certificate-${certificateId}.pdf`
		);

		await directus.request(uploadFiles(formDataUpload));

		const fileURL = `${envPub.PUBLIC_URL}/cms/assets/${certificateFileId}`;

		return redirect(303, fileURL);
	}
};
