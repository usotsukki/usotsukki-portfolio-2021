export function throttle(cb, delay = 20) {
	let shallWait = false;
	let waitingArgs;
	const timeoutFunc = () => {
		if (waitingArgs == null) {
			shallWait = false;
		} else {
			cb(waitingArgs);
			waitingArgs = null;
			setTimeout(timeoutFunc, delay);
		}
	};

	return (...args) => {
		if (shallWait) {
			waitingArgs = args;
			return;
		}
		cb(...args);
		shallWait = true;

		setTimeout(timeoutFunc, delay);
	};
}
