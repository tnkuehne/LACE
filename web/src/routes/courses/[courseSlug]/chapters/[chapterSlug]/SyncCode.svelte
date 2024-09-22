<script lang="ts">
	import QRCode from 'qrcode';
	import { Separator } from '$lib/components/ui/separator';

	export let url: string;

	let qrCodeCanvas: HTMLCanvasElement | null = null;

	$: if (url && qrCodeCanvas) {
		QRCode.toCanvas(qrCodeCanvas, url, function (error) {
			if (error) console.error(error);
			console.log('QR code generated!');
		});
	}
</script>

<div class="flex flex-col items-center gap-8 py-8">
	<canvas bind:this={qrCodeCanvas}></canvas>
	<div class="flex w-[150px] flex-row items-center justify-center">
		<Separator />
		<p class="mx-2">or</p>
		<Separator />
	</div>
	<p>{url}</p>
</div>
