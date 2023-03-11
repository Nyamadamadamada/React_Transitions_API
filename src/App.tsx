import { useState } from "react";
const cdnURL =
  "https://cdn.glitch.global/de7f29c8-57eb-4eb1-81b5-4e0d8565ade5/";

type Image = {
  name: string;
  file: string;
};

const imageData: Image[] = [
  {
    name: "Jungle coast",
    file: "jungle-coast",
  },
  {
    name: "Bird in the tree",
    file: "tree-bird",
  },
  {
    name: "A view from the sky",
    file: "view-from-the-sky",
  },
  {
    name: "The view across the water",
    file: "watery-view",
  },
];

function App() {
  const [src, setSrc] = useState(cdnURL + imageData[0].file + ".jpg");
  const [text, setText] = useState(imageData[0].name);

  const handelClick = (data: Image) => {
    const displayNewImage = () => {
      setSrc(cdnURL + data.file + ".jpg");
      setText(data.name);
    };
    // DOM を更新するための引数としてコールバック関数を配置
    document.startViewTransition(() => displayNewImage());
  };
  return (
    <div className="App">
      <h1>React View Transitions API demo</h1>
      <main>
        <section className="thumbs">
          {imageData.map((data) => {
            return (
              <a
                key={data.name}
                href="#"
                title={`Click to load ${data.name} in main gallery view`}
                onClick={() => handelClick(data)}
              >
                <img alt={data.name} src={cdnURL + data.file + "_th.jpg"} />
              </a>
            );
          })}
        </section>
        <section className="gallery-view">
          <figure>
            <img src={src} />
            <figcaption>
              <div className="caption-text">{text}</div>
            </figcaption>
          </figure>
        </section>
      </main>
    </div>
  );
}

export default App;
