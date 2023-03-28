export const convertDateToHours = (dateString) => {
	const date = new Date(dateString);
	const hours = Math.floor((Date.now() - date) / (1000 * 60 * 60));
	return `${hours} 小時`;
};
