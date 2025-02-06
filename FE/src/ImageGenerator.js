import React, {useState} from "react";
import axios from "axios";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Image generation
  const handleImageGeneration = async (e) => {
    e.preventDefault();
    setLoadingImage(true);
    setGeneratedImage("");

    if (!prompt) {
      setError("Prompt is required.");
      setLoadingImage(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-image",
        {
          prompt,
        }
      );
      setGeneratedImage(response.data.imageUrl); // Assuming the API returns the image URL
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <div style={{padding: "20px", fontFamily: "Arial, sans-serif"}}>
      {/* Image Generation Section */}
      <form
        onSubmit={handleImageGeneration}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2>Generate product images for your brand</h2>

        {/* Error Message */}
        {error && <p style={{color: "red"}}>{error}</p>}

        <div style={{marginBottom: "10px"}}>
          <label style={{display: "block", marginBottom: "5px"}}>
            Image Prompt
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Generate Product
        </button>
      </form>

      {/* Display Generated Image */}
      {loadingImage && <p>Generating image...</p>}
      {generatedImage && (
        <img
          src={generatedImage}
          alt="Generated"
          style={{marginTop: "20px", maxWidth: "100%"}}
        />
      )}
    </div>
  );
}

export default ImageGenerator;
