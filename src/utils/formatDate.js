//
// 接受時間字串
// 回傳時間格式如：`${ampm} ${formattedHours}:${formattedMinutes}・${year}年${month}月${day}日`
export const formatDate = (dateString) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours < 12 ? '上午' : '下午';
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	return `${ampm} ${formattedHours}:${formattedMinutes}・${year}年${month}月${day}日`;
};
