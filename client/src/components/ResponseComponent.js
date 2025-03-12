import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserResponses, submitResponses } from '../services/ResponseService';

const ResponseComponent = () => {
  const { userId } = useParams(); // Get userId from URL
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchUserResponses();
  }, [userId]);

  const fetchUserResponses = async () => {
    const response = await getUserResponses(userId);
    setResponses(response.data);
  };

  const handleSubmit = async (newResponses) => {
    await submitResponses(newResponses);
    fetchUserResponses();
  };

  return (
    <div>
      <h1>Responses for User {userId}</h1>
      <ul>
        {responses.map((response, index) => (
          <li key={index}>{response.answer}</li>
        ))}
      </ul>
      <button onClick={() => handleSubmit([{ questionId: 1, answer: 'Sample Answer' }])}>
        Submit Sample Response
      </button>
    </div>
  );
};

export default ResponseComponent;