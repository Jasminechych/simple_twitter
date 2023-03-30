// 擷取字串
// 接受參數：字串, 要擷取長度
// 回傳值：一個字串
export const truncateString = (str, maxLength) => {
	if (str === null || str.length <= maxLength) {
		return str;
	}

	return `${str.substring(0, maxLength)}...`;
};
