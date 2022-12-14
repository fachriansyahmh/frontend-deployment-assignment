import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Photos from "./Photos";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    fetch("https://gallery-app-server.vercel.app/photos/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl,
        captions,
        updatedAt: new Date(
          new Date().toString().split("GMT")[0] + " UTC"
        ).toISOString(),
      }),
    }).then(() => {
      setImageUrl("");
      setCaptions("");
      navigate("/photos");
    });
  };

  useEffect(() => {
    fetch("https://gallery-app-server.vercel.app/photos/" + id)
      .then((res) => res.json())
      // .then((json) => setPhotos(json))
      // .then(setImageUrl(imageUrl))
      .then((photo) => {
        setImageUrl(photo.imageUrl);
        setCaptions(photo.captions);
      })
      .then(setLoading(false))
      .catch((err) => console.log(err?.message));
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
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
      )}
    </>
  );
};

export default EditPhoto;
