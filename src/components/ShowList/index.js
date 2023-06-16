import React from 'react';
import './ShowList.scss';
export default function ShowList() {
	return (
		<>
			<div className="newtask_wrapper">
				<h4>Show List</h4>
				<div className="newtask-content">
					<div className="search">
						<input
							type="text"
							placeholder="Search ..."></input>
					</div>
					<div className="list">
						<div className="task">
							<div className="task-left">
								<input type="checkbox"></input>
								<p className="name">Phạm Anh Minh</p>
							</div>

							<div className="task-right">
								<button className="detail">Detail</button>
								<button className="remove">Remove</button>
							</div>
						</div>
            <div className="task">
							<div className="task-left">
								<input type="checkbox"></input>
								<p className="name">Phạm Anh Minh</p>
							</div>

							<div className="task-right">
								<button className="detail">Detail</button>
								<button className="remove">Remove</button>
							</div>
						</div>
					</div>
				</div>
        <div className="task-actions">
          <div className="actions-left">
            <p>Bulk Action:</p>
          </div>
          <div className="actions-right">
          <button className="done">Done</button>
								<button className="remove">Remove</button>
          </div>

        </div>
			</div>
		</>
	);
}
