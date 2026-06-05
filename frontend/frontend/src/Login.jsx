import { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

function Login({ setUser }) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const signup = async () => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(
        "Signup UID:",
        userCredential.user.uid
      );

      setUser(
        userCredential.user
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(
        "User UID:",
        userCredential.user.uid
      );

      setUser(
        userCredential.user
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Expense Tracker</h2>

      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={signup}
      >
        Sign Up
      </button>

      <button
        onClick={login}
        style={{
          marginLeft: "10px",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;