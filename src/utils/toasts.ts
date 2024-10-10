import { toast } from 'sonner';

type Toast = {
	title: string;
	description?: string;
	type?: 'success' | 'error';
	actionLabel?: string;
	actionCallback?: () => void;
};

export const generateError = (error: any) => {
	if (typeof error === 'string') {
		return error;
	} else {
		return 'Unknown';
	}
};

const createToast = ({
	title,
	description,
	type,
	actionLabel,
	actionCallback,
}: Toast) => {
	const hasSpread = actionLabel || actionCallback || description;
	const spread = hasSpread
		? {
				...(description ? { description } : {}),
				action: {
					...(actionLabel ? { label: actionLabel } : {}),
					...(actionCallback
						? { onClick: actionCallback }
						: { onClick: () => {} }),
				},
			}
		: {};
	if (type) {
		// @ts-ignore
		toast[type](title, spread);
	} else {
		// @ts-ignore
		toast(title, spread);
	}
};

export default createToast;
