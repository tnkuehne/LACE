<script lang="ts">
	import QRCode from 'qrcode';
	import { Separator } from '$lib/components/ui/separator';

	export let url: string;

	let qrCodeCanvas;

	$: if (url) {
		QRCode.toCanvas(qrCodeCanvas, url, function (error) {
			if (error) console.error(error);
			console.log('QR code generated!');
		});
	}
</script>

<div class="flex flex-col">
	<canvas bind:this={qrCodeCanvas}></canvas>
	<div class="flew-row flex">
		<Separator />
	</div>
	<p>{url}</p>
</div>
