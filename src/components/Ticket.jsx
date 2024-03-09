import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { protecdInstance } from '../services/instance';
import Navlink from './Navbar/Navbar';

function Ticket() {
  const [view, setView] = useState([]);
  const navigate = useNavigate();

  const getTicket = async () => {
    try {
      const res = await protecdInstance.get('/ticket');
      setView(res.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      navigate('/signin')
    }
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    navigate('/create');
  };

  const handleEditTicket = async (id) => {
    await protecdInstance.patch(`/ticket/${id}`);
    getTicket();
  };

  const handleDeleteTicket = async (id) => {
    try {
      await protecdInstance.delete(`/ticket/${id}`);
      getTicket();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <div>
      <Navlink />
      <div className="mt-4">
        <h2 className="text-center m-3">All Tickets</h2>
        <button
          className="btn btn-outline-success m-3"
          onClick={handleCreateTicket}
        >
          + Create Ticket
        </button>
        <div>
          <div className="m-3 ">
            {view.length === 0 ? (
              <>
                <h2 className="no">No Ticket Created</h2>
              </>
            ) : (
              <>
                <ul className="card-group row ">
                  {view.map((info) => (
                    <li
                      className="list-group-item mb-3 col-sm-12 col-md-6 col-lg-4"
                      key={info._id}
                    >
                      <div className="card m-3 ticket bg-dark-subtle ">
                        <h3 className="card-header">
                          <span className="text-success">Title : </span>
                          {info.title}
                          <button
                            className="btn btn-outline-danger float-end"
                            onClick={() => handleEditTicket(info._id)}
                          >
                            Close
                          </button>
                        </h3>
                        <div className="card-body d-flex flex-column">
                          <p className="card-text">
                            <strong>Category : </strong>
                            {info.category}
                          </p>
                          <p className="card-text">
                            <strong>Description : </strong>
                            {info.description}
                          </p>
                          <p className="card-text">
                            <strong>Language : </strong>
                            {info.language}
                          </p>
                          <p className="card-text">
                            <strong>Status : </strong>
                            {info.status}
                          </p>
                          <p className="card-text">
                            <strong>Assignee :</strong>{" "}
                            {info.assignedTo === null ? "-" : info.assignedTo}
                          </p>
                          <p className="card-text">
                            <strong>Create Time :</strong>{" "}
                            {new Date(info.createTime).toLocaleString()}
                          </p>
                          <button
                            className="btn btn-danger m-3 mx-auto "
                            onClick={() => handleDeleteTicket(info._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;