import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = (e) => {
    e.preventDefault();
    secret === "password"
      ? fetch("https://gallery-app-server.vercel.app/photos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl,
            captions,
            createdAt: new Date(
              new Date().toString().split("GMT")[0] + " UTC"
            ).toISOString(),
            updatedAt: new Date(
              new Date().toString().split("GMT")[0] + " UTC"
            ).toISOString(),
            secret,
          }),
        }).then(() => {
          setImageUrl("");
          setCaptions("");
          setSecret("");
          navigate("/photos");
        })
      : setError("You are not authorized");
  };

  return (
    <>
      <div className="container">
        {error && <div className="error-msg">{error}</div>}
        <form className="add-form" onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input
            className="submit-btn"
            type="submit"
            value="Submit"
            data-testid="submit"
          />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
