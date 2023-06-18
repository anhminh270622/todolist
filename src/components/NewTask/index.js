import React, { useEffect } from 'react';
import './NewTask.scss';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function NewTask() {
	const [add, setAdd] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('normal');
	// useEffect(async () => {
	// }, [])
	const getTodayDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	const [date, setDate] = useState(getTodayDate());

	const handleConfig = () => {
		const data = {
			add: add,
			description: description,
			date: date,
			priority: priority,
		};
		if (add) {
			axios
				.post("https://todolist-bda8c-default-rtdb.firebaseio.com/todo.json", data)
				.then((response) => {
					// console.log("Data", response.data);
					toast.success("Thêm thành công", {
						position: toast.POSITION.TOP_RIGHT,
					});
				})
				.catch((error) => {
					console.error("Error", error);
				});
		} else {
			toast.warning("Vui lòng điền tên task", {
				position: toast.POSITION.TOP_RIGHT,
			});
		}

	};


	return (
		<>
			<div className="new-task">
				<ToastContainer />
				<h4>New Task</h4>
				<div className="content">
					<div className="add">
						<input
							placeholder="Add new task ..."
							value={add}
							onChange={(e) => setAdd(e.target.value)}></input>
					</div>
					<div className="description">
						<div>Description</div>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}></textarea>
					</div>
					<div className="select">
						<div className="date">
							<div>Due Date</div>
							<input
								type="date"
								value={date}
								defaultValue={getTodayDate()}
								onChange={(e) => setDate(e.target.value)}></input>
						</div>
						<div className="piority">
							<label for="select">Piority</label>
							<select
								id="select"
								value={priority}
								onChange={(e) => setPriority(e.target.value)}>
								<option value="low">Low</option>
								<option value="normal">Normal</option>
								<option value="high">High</option>
							</select>
						</div>
					</div>
				</div>
				<div className="button">
					<button onClick={() => handleConfig()}>Add</button>
				</div>
			</div>
		</>
	);
}
