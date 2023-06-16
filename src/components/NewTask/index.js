import React from 'react';
import './NewTask.scss';
export default function NewTask() {
	return (
		<>
			<div className="new-task">
				<h4>New Task</h4>
				<div className="content">
					<div className="add">
						<input placeholder="Add new task ..."></input>
					</div>

					<div className="description">
						<div>Description</div>
						<textarea></textarea>
					</div>
					<div className="select">
						<div className="date">
							<div>Due Date</div>
							<input type="date"></input>
						</div>
						<div className="piority">
							<div for="normal">Piority</div>
							<select
								id="normal"
								value="normal">
								<option value="low">Low</option>
								<option value="normal">Normal</option>
								<option value="high">High</option>
							</select>
						</div>
					</div>
				</div>
				<div className="button">
					<button>Add</button>
				</div>
			</div>
		</>
	);
}
