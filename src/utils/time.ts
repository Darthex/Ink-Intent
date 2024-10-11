export const date = (timeString: string) => new Date(timeString);

export const getFormattedTime = (
	s: string,
	format: 'full' | 'date-only' = 'full'
) => {
	const d = date(s);
	switch (format) {
		case 'full':
			return d.toLocaleTimeString('en-US', {
				day: 'numeric',
				month: 'short',
			});
		case 'date-only':
			d.toLocaleDateString('en-US', {
				day: 'numeric',
				month: 'short',
			});
	}
};
