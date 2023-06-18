import React, { useState, useEffect } from 'react';
import './ShowList.scss';
import TodoDetail from './TodoDetail';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ShowList() {
	const [filteredData, setFilteredData] = useState("");
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [search, setSearch] = useState("")
	const [checkedItems, setCheckedItems] = useState([]);
	const [detailItemId, setDetailItemId] = useState(null);
	const fetchData = async () => {
		try {
			const response = await axios.get(
				'https://todolist-bda8c-default-rtdb.firebaseio.com/todo.json'
			);
			const data = response.data;
			const dataArray = Object.keys(data).map((key) => ({
				id: key,
				...data[key],
				show: show
			}));
			// const sortedData = dataArray.sort((a, b) => new Date(a.date) - new Date(b.date));
			// console.log("sortedData",sortedData)
			setData(dataArray);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [data, show]);

	// const handleDetails = (itemId) => {
	// 	setDetailItemId((prevItemId) => (prevItemId === itemId ? '' : itemId));
	// };
	const handleDetails = (itemId) => {
		setDetailItemId(itemId);
		setShow(true);
		// console.log("show",show)
	  };
	const handleCheckboxChange = (event, id) => {
		if (event.target.checked) {
			setCheckedItems(prevCheckedItems => [...prevCheckedItems, id]);
		} else {
			setCheckedItems(prevCheckedItems => prevCheckedItems.filter(itemId => itemId !== id));
		}
	};
	const handleRemove = async (id) => {
		try {
			await axios.delete(
				`https://todolist-bda8c-default-rtdb.firebaseio.com/todo/${id}.json`
			);
			const remove = data.filter((item) => item.id !== id);
			setData(remove);
			toast.success('Xóa thành công', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleRemoveAll = async () => {
		console.log('thành công');
		try {
			if (checkedItems.length > 0) {
				checkedItems.map(async (id) => {
					await axios.delete(
						`https://todolist-bda8c-default-rtdb.firebaseio.com/todo/${id}.json`
					);
				});
				setCheckedItems([]);
				toast.success('Xóa thành công các mục đã chọn', {
					position: toast.POSITION.TOP_RIGHT,
				});
			} else {
				await axios.delete(
					`https://todolist-bda8c-default-rtdb.firebaseio.com/todo.json`
				);
				setData([]);
				toast.success('Xóa thành công tất cả', {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSearch = (event) => {
		const keyword = event.target.value.toLowerCase();
		setSearch(event.target.value)
		const filteredData = data.filter(
			(item) => item.add.toLowerCase().includes(keyword)
		);
		setFilteredData(filteredData);
	};

	useEffect(() => {
		setFilteredData(data);
	}, []);
	return (
		<>
			<ToastContainer />
			<div className="show-task">
				<div className="newtask_wrapper">
					<h4>To do List</h4>
					<div className="newtask-content">
						<div className="search">
							<input
								type="text"
								placeholder="Search ..."
								value={search}
								onChange={handleSearch}
							/>
						</div>
						<div className="list">
							{search === '' ? (data &&
								data.map((item) => (
									<div
										className="task"
										key={item.id}>
										<div className="task-list">
											<div className="task-left">
												<input type="checkbox"
													onChange={event => handleCheckboxChange(event, item.id)}
													checked={checkedItems.includes(item.id)}
												/>
												<p className="name">{item.add}</p>
											</div>
											<div className="task-right">
												<button
													className="detail"
													onClick={() => handleDetails(item.id)}>
													Detail
												</button>
												<button
													className="remove"
													onClick={() => handleRemove(item.id)}>
													Remove
												</button>
											</div>
										</div>
										<div className={`task-detail ${item.id === detailItemId ? "" : "hidden"}`}>
											{item.id === detailItemId && <TodoDetail data={item} />}
										</div>
									</div>
								))) :
								(
									filteredData &&
									filteredData.map((item) => (
										<div
											className="task"
											key={item.id}>
											<div className="task-list">
												<div className="task-left">
													<input type="checkbox"
														onChange={event => handleCheckboxChange(event, item.id)}
														checked={checkedItems.includes(item.id)}
													/>
													<p className="name">{item.add}</p>
												</div>
												<div className="task-right">
													<button
														className="detail"
														onClick={() => handleDetails(item.id)}>
														Detail
													</button>
													<button
														className="remove"
														onClick={() => handleRemove(item.id)}>
														Remove
													</button>
												</div>
											</div>
											<div
												className={`task-detail ${show === false ? "hidden" : ""}`}
											>
												{item.id === detailItemId && <TodoDetail data={item} />}
											</div>
										</div>
									)
									)
								)}
						</div>
					</div>
				</div>
				<div className="task-actions">
					<div className="actions-left">
						<p>Bulk Action:</p>
					</div>
					<div className="actions-right">
						<button className="done">Done</button>
						<button className="remove" onClick={handleRemoveAll}>Remove</button>
					</div>
				</div>
			</div>
		</>
	);
}
