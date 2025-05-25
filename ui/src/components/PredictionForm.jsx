import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PredictionForm.css'; // Import the CSS file

export const PredictionForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        bmi: '',
        smoker: '',
        alcohol_consumer: '',
        disease: '',
    });

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [allPredictions, setAllPredictions] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/predict/', formData);
            setPrediction(response.data.predicted_cost);
            fetchPredictions();
        } catch (err) {
            setError('Error fetching prediction. Please check API connection.');
            console.error('Error fetching prediction:', err);
        }
    };

    const fetchPredictions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/predict/');
            setAllPredictions(response.data);
        } catch (err) {
            console.error('Error fetching all predictions:', err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this prediction?");
        if (!confirmDelete) return;

        try {
            await axios.delete('http://127.0.0.1:8000/api/predict/', {
                data: { id }
            });
            fetchPredictions();
        } catch (err) {
            console.error('Error deleting prediction:', err);
            alert('Failed to delete prediction.');
        }
    };

    useEffect(() => {
        fetchPredictions();
    }, []);

    return (
        <div className="prediction-container">
            <h2 className="title">Predict Health Insurance Cost</h2>

            <form className="prediction-form" onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <select name="gender" value={formData.gender} onChange={handleChange} className="form-input" required>
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
                <input
                    type="number"
                    name="bmi"
                    placeholder="BMI"
                    value={formData.bmi}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <select name="smoker" value={formData.smoker} onChange={handleChange} className="form-input" required>
                    <option value="">Smoker?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <select name="alcohol_consumer" value={formData.alcohol_consumer} onChange={handleChange} className="form-input" required>
                    <option value="">Alcohol Consumer?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <select name="disease" value={formData.disease} onChange={handleChange} className="form-input" required>
                    <option value="">Select Disease</option>
                    <option value="no">No Disease</option>
                    <option value="heart disease">Heart Disease</option>
                    <option value="advanced-stage cancer">Advanced-Stage Cancer</option>
                    <option value="mental and behavioral disorders">Mental and Behavioral Disorders</option>
                    <option value="liver disease">Liver Disease</option>
                    <option value="aids">AIDS</option>
                    <option value="coma">Coma</option>
                </select>
                <button type="submit" className="submit-button">Predict</button>
            </form>

            {error && <p className="error-text">{error}</p>}

            {prediction !== null && (
                <p className="result-text">
                    {prediction === 0 && formData.disease !== "no" ? (
                        <span className="warning-text">
                            Predicted Insurance Cost: 0 LKR (If you have a disease, you cannot get insurance).
                        </span>
                    ) : (
                        <>Predicted Insurance Cost: {prediction} LKR.</>
                    )}
                </p>
            )}

            <h3 className="subtitle">All Predictions</h3>
            {allPredictions.length === 0 ? (
                <p>No predictions found.</p>
            ) : (
                <table className="prediction-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>BMI</th>
                            <th>Smoker</th>
                            <th>Alcohol</th>
                            <th>Disease</th>
                            <th>Predicted Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPredictions.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.age}</td>
                                <td>{p.gender}</td>
                                <td>{p.bmi}</td>
                                <td>{p.smoker}</td>
                                <td>{p.alcohol_consumer}</td>
                                <td>{p.disease}</td>
                                <td>{p.predicted_cost} LKR</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PredictionForm;
