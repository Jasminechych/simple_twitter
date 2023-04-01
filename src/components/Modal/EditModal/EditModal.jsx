import style from 'src/components/Modal/EditModal/EditModal.module.scss';
import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { AddPhoto, Close } from 'src/assets/icons';
import { ButtonS } from 'src/components/buttons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getEditProfile, getUserData } from 'src/apis/user';
import Swal from 'sweetalert2';

export const EditModal = () => {
	const navigate = useNavigate();
	const avatarInputRef = useRef(null);
	const coverInputRef = useRef(null);

	// 	使用者取得自己的資料
	const [initialValues, setInitialValues] = useState({
		id: '',
		name: '',
		avatar: '',
		cover: '',
		introduction: '',
	});
	console.log('initialValues:', initialValues);

	// 取得
	useEffect(() => {
		const getUsersInfo = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			// console.log('currentUserId: ', currentUserId.currentUserId);
			try {
				const data = await getUserData(currentUserId.currentUserId);
				console.log('GET從後台的data:', data);

				setInitialValues({
					id: data.id,
					name: data.name,
					avatar: data.avatar,
					cover: data.cover,
					introduction: data.introduction,
				});
			} catch (error) {
				console.error(error);
			}
		};
		getUsersInfo();
	}, []);

	// 輸入時同步取得,可修改名稱和自我介紹
	// const [name, setName] = useState(initialValues.name);
	// const [introduction, setIntro] = useState(initialValues.introduction);

	// 阻擋預設行為
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	// 選擇avatar檔案時觸發的事件處理函式
	const handleAvatarFileChange = (event) => {
		setInitialValues({ ...initialValues, avatar: event.target.files[0] });
		console.log('initialValues.avatar:', initialValues.avatar);
	};
	// 選擇cover檔案時觸發的事件處理函式
	const handleCoverFileChange = (event) => {
		setInitialValues({ ...initialValues, cover: event.target.files[0] });
		console.log('initialValues.cover:', initialValues.cover);
	};

	//
	const handleSave = async () => {
		// 輸入框若有任一為空，防止表單送出，且跳出提示視窗
		if (!initialValues.name.trim().length || !initialValues.introduction.trim().length) {
			return;
		}

		try {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId);

			// 帶入id，把更新的資料傳回後端
			const id = currentUserId.currentUserId;
			// console.log('ID', id);
			const response = await getEditProfile(id, {
				name: initialValues.name,
				avatar: initialValues.avatar,
				cover: initialValues.cover,
				introduction: initialValues.introduction,
			});
			console.log('點選儲存後,從後台回傳前台的Data', response);

			// 再取一次userData
			const data = await getUserData(currentUserId.currentUserId);
			console.log('再度拿更新後的data', data);

			setInitialValues({
				name: data.name,
				avatar: data.avatar,
				cover: data.cover,
				introduction: data.introduction,
			});
			console.log('修改為的資料', data);

			const success = response.statusText;
			if (success === 'OK') {
				Swal.fire({
					title: '儲存成功',
					icon: 'success',
					showConfirmButton: false,
					position: 'top',
					timer: 1000,
				});

				navigate('/user/self');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className={style.dark}></div>
			<div className={style.editModalContainer}>
				<div className={style.editTitleContainer}>
					<div className={style.buttonTitleWrapper}>
						<Link to='/user/self'>
							<Close className={style.closeButton} />
						</Link>
						<h5 className={style.modalHeader}>編輯個人資料</h5>
					</div>
					<ButtonS text='儲存' onClick={handleSave} />
				</div>
				<div>
					<form
						action='/users/{{id}}?_method=PUT'
						method='POST'
						onSubmit={handleSubmit}
						className={style.editModalBackgroundPhoto}
						encType='multipart/form-data'
					>
						<img src={initialValues.cover} className={style.backgroundPhoto} />
						<div className={style.addAndClose}>
							<AddPhoto
								className={style.addPhoto}
								onClick={() => {
									coverInputRef.current.click();
								}}
							/>
							<input
								type='file'
								style={{ display: 'none' }} // 隱藏 input 元素
								ref={coverInputRef} // 取得 input 元素的引用
								onChange={handleCoverFileChange}
							/>
							<Close
								className={style.closePhoto}
								onClick={() => setInitialValues({ ...initialValues, cover: null })}
							/>
						</div>
					</form>
				</div>
				<div>
					<form
						action='/users/{{id}}?_method=PUT'
						method='PUT'
						onSubmit={handleSubmit}
						className={style.editModalAvatar}
						encType='multipart/form-data'
					>
						<img src={initialValues.avatar} className={style.avatar} />
						<AddPhoto
							className={style.addAvatarPhoto}
							onClick={() => {
								avatarInputRef.current.click();
							}}
						/>
						<input
							type='file'
							style={{ display: 'none' }} // 隱藏 input 元素
							ref={avatarInputRef} // 取得 input 元素的引用
							onChange={handleAvatarFileChange}
						/>
					</form>
				</div>
				<div className={style.editModalInfo}>
					<AuthInput
						label='名稱'
						title='name'
						type='text'
						placeholder='請輸入使用者名稱'
						maxLength='50'
						value={initialValues.name}
						errorMessage={
							!initialValues.name || !initialValues.name.trim().length ? '內容不可空白' : ''
						}
						onChange={(nameInputValue) =>
							setInitialValues({
								...initialValues,
								name: nameInputValue,
							})
						}
					/>

					<AuthInput
						label='自我介紹'
						title='name'
						type='text'
						placeholder='自我介紹'
						maxLength='160'
						value={initialValues.introduction}
						errorMessage={
							!initialValues.introduction || !initialValues.introduction.trim().length
								? '內容不可空白'
								: ''
						}
						onChange={(introInputValue) =>
							setInitialValues({
								...initialValues,
								introduction: introInputValue,
							})
						}
						inputHeight={147}
					/>
				</div>
			</div>
		</>
	);
};
