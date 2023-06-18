import React from 'react';
import './TodoDetail.scss';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function TodoDetail(props) {
	const items = props.data;
	// console.log("thành công", items);
	const [add, setAdd] = useState(items.add);
	const [description, setDescription] = useState(items.description);
	const [priority, setPriority] = useState(items.priority);
	const [date, setDate] = useState(items.date);
	const handleUpdate = () => {
		const data = {
			add: add,
			description: description,
			date: date,
			priority: priority
		}
		if (add) {
			axios.put(`https://todolist-bda8c-default-rtdb.firebaseio.com/todo/${items.id}.json`, data)
				.then(response => {
					toast.success("Cập nhật thành công", {
						position: toast.POSITION.TOP_RIGHT,
					});
				})
				.catch(error => console.error(error));
		} else {
			toast.warning("Không được để trống task", {
				position: toast.POSITION.TOP_RIGHT,
			});
		}

	}
	return (
		<>
			<div className="detail-task">
				<div className="content">
					<div className="add">
						<input placeholder="Do homework ..." value={add} onChange={e => setAdd(e.target.value)}></input>
					</div>

					<div className="description">
						<div>Description</div>
						<textarea value={description}
							onChange={e => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className="select">
						<div className="date">
							<div>Due Date</div>
							<input type="date" value={date}
								onChange={e => setDate(e.target.value)}
							></input>
						</div>
						<div className="priority">
							<div for="normal">priority</div>
							<select
								id="normal"
								value={priority}
								onChange={e => setPriority(e.target.value)}
							>
								<option value="low">Low</option>
								<option value="normal">Normal</option>
								<option value="high">High</option>
							</select>
						</div>
					</div>
				</div>
				<div className="button">
					<button onClick={handleUpdate}>Update</button>
				</div>
			</div>
		</>
	);
}
