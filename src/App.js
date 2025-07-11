import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    customerName: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    email: ''
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', formData);
      alert('Room booked successfully!');
      setFormData({ customerName: '', checkInDate: '', checkOutDate: '', roomType: '', email: '' });
      fetchBookings();
    } catch (error) {
      alert(error.response.data.message || 'Booking failed.');
    }
  };

  return (
    <div className="container">
      <h2>Room Booking System</h2>
      <form onSubmit={handleSubmit} className="form">
        
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
        />
        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          required
        >
          <option value="">Select Room Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Room</button>
      </form>

      <h3>Booked Rooms</h3>
      <ul className="bookings-list">
        {bookings.map((booking) => (
          <li key={booking._id}>
            <strong>{booking.customerName}</strong> booked a <strong>{booking.roomType}</strong> room from <strong>{booking.checkInDate}</strong> to <strong>{booking.checkOutDate}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

