import "./Assets/main.css";
import { useState, useRef } from "react";
import ColorThief from "colorthief";

function App() {
  const [post, setPost] = useState({
    photos: [],
  });
  const [highlight, setHighlight] = useState(false);

  const { photos } = post;

  const [colors, setColors] = useState([]);

  const imgRef = useRef(null);

  const handlefilechange = (e) => {
    let files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    let photosArr = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        let fileobj = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result,
        };
        photosArr.push(fileobj);
        setPost({
          ...post,
          photos: [...photos, ...photosArr],
        });
      });
    }
  };

  const handleHighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };

  const handleUnhighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handledrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
    setHighlight(false);
  };

  const getColor = () => {
    const colorThief = new ColorThief();
    const img = imgRef.current;
    const results = colorThief.getPalette(img, 6);
    var b = results.map((subarray) => {
      return subarray.map((x) => {
        //For each array element
        x = parseInt(x).toString(16); //Convert to a base16 string
        return x.length === 1 ? "0" + x : x; //Add zero if we get only one character
      });
    });
    const c = b.map(function (x) {
      const hex = "#" + x.join("");
      return hex;
    });
    setColors(c);
    console.log(c);
  };

  return (
    <div className="file-upload">
      <div className="header">
        <h2 className="name">Paletter</h2>
        <form className="" encType="multipart/form-data">
          <div
            className={
              highlight
                ? "custom-file-drop-area highlight"
                : "custom-file-drop-area"
            }
            onDragEnter={handleHighlight}
            onDragOver={handleHighlight}
            onDragLeave={handleUnhighlight}
            onDrop={handledrop}
          >
            <div className="custom-file-drop-area ">
              <input
                type="file"
                name="photos"
                placeholder="Enter photos"
                id="filephotos"
                onChange={handlefilechange}
              />
              <label htmlFor="filephotos">Drag & Drop</label>
            </div>
          </div>
        </form>
      </div>

      <div className="custom-file-preview">
        {photos.length > 0 && (
          <div className="prev-img">
            <img
              src={photos[photos.length - 1].src}
              alt={photos[photos.length - 1].name}
              ref={imgRef}
              onLoad={getColor}
              onChange={getColor}
            />
          </div>
        )}
      </div>

      <div className="palette-container">
        {colors.length > 0 &&
          colors.map((item, index) => (
            <div
              className="color-item"
              style={{ backgroundColor: item }}
              key={index}
            >
              <div className="color-label-container">
                <p className="color-label">{item}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
