import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useSignupMutation,
} from "../../graphql/generated/schema";
import { AUTH_TOKEN } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  const [login] = useLoginMutation({
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      if (!login) {
        return;
      }
      localStorage.setItem(AUTH_TOKEN, login.token ?? "");
      navigate("/");
    },
  });

  const [signup] = useSignupMutation({
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      if (!signup) {
        return;
      }
      localStorage.setItem(AUTH_TOKEN, signup.token ?? "");
      navigate("/");
    },
  });

  return (
    <div>
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={() => {
            const handler = formState.login ? login : signup;
            handler();
          }}
        >
          {formState.login ? "login" : "create account"}
        </button>
        <button
          className="pointer button"
          onClick={() =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? "need to create an account?"
            : "already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
