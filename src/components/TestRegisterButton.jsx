import React from "react";
import { getFCMToken } from "../helpers/firebase.js";

const TestRegisterButton = () => {
  const handleClick = async () => {
    console.log("Button clicked, testRegisterUser function triggered.");
    try {
      // Mock user data
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        interests: ["coding", "reading"],
        password: "securepassword123",
        lat: 12.9121,
        lng: 77.6446,
        area: "Bangalore",
      };

      // Get FCM token
      const fcmToken = await getFCMToken();
      if (!fcmToken) {
        console.error("Failed to retrieve FCM token.");
        return;
      }

      // Add FCM token to user data
      userData.fcmToken = fcmToken;
      console.log("FCM Token added to user data:", fcmToken);

      // Call registerUser API
      console.log("Initiating API call with user data:", userData);
      const response = await fetch("http://127.0.0.1:8000/data/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("API response received:", response);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Parsed response data:", responseData);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <button onClick={handleClick} style={{ padding: "10px", margin: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px" }}>
      Test Register User
    </button>
  );
};

export default TestRegisterButton;
