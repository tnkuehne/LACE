<svg
	viewBox="0 0 1000 300"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
	class={$$props.class}
>
	<filter id="noiseFilter">
		<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
		<feComponentTransfer>
			<feFuncR type="linear" slope="0.1" intercept="-0.7" />
			<!-- Darker red channel -->
			<feFuncG type="linear" slope="0.1" intercept="-0.7" />
			<!-- Darker green channel -->
			<feFuncB type="linear" slope="0.1" intercept="-0.7" />
			<!-- Darker blue channel -->
			<feFuncA type="linear" slope="1" />
		</feComponentTransfer>
	</filter>

	<rect width="100%" height="100%" filter="url(#noiseFilter)" />
</svg>
