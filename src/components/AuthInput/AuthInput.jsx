import { useState } from 'react';
import style from 'src/components/AuthInput/AuthInput.module.scss';

// 接受 props 為 label: label名稱、 title: input名稱、type: input類型、placeholder: input提示字、maxLength: input長度限制
export const AuthInput = ({ label, title, type, placeholder = '', maxLength = 0 }) => {
	const [inputValue, setInputValue] = useState('');

	const inputLength = inputValue.length;

	// 判斷 input 輸入內容長度，若大於設定之 input 長度，設定 hintMessage，input 樣式改為 error 之 css
	let hintMessage = '';
	let inputStyle = style.input;

	if (maxLength && inputLength > maxLength) {
		hintMessage = '超過字數上限';
		inputStyle = style.inputError;
	}

	// 若有傳入 input 長度限制，顯示計數器
	let hintCounter = null;
	if (maxLength > 0) {
		hintCounter = `${inputLength === 0 ? 0 : inputLength}/${maxLength}`;
	}

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className={style.inputContainer}>
			<input
				className={inputStyle}
				id={label}
				name={title}
				type={type}
				placeholder={placeholder}
				value={inputValue}
				onChange={handleChange}
			/>
			<label htmlFor={label} className={style.inputLabel}>
				{label}
			</label>
			<div className={style.inputHint}>
				<p className={style.inputHintMessage}>{hintMessage}</p>
				{maxLength > 0 && <p className={style.inputHintCounter}>{hintCounter}</p>}
			</div>
		</div>
	);
};
