import { useState } from "react";
const cdnURL = "https://react-transitions-api-demo.vercel.app/image/";

type Image = {
  name: string;
  file: string;
};

interface ExDocument extends Document {
  startViewTransition?: any;
}

const imageData: Image[] = [
  {
    name: "チューリップ",
    file: "25603452.png",
  },
  {
    name: "スカイツリー",
    file: "25447899.png",
  },
  {
    name: "つくし",
    file: "25794366.png",
  },
  {
    name: "ネモフィラ",
    file: "25839343.png",
  },
];

function App() {
  const [src, setSrc] = useState(cdnURL + imageData[0].file);
  const [text, setText] = useState(imageData[0].name);

  const handelClick = (data: Image) => {
    const displayNewImage = () => {
      setSrc(cdnURL + data.file);
      setText(data.name);
    };
    const doc: ExDocument = document;
    // View Transitions API未対応のブラウザの場合
    if (!doc.startViewTransition) {
      displayNewImage();
      return;
    }
    // 引数にDOM更新用のコールバック関数を渡す
    doc.startViewTransition(() => displayNewImage());
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
                <img
                  alt={data.name}
                  src={cdnURL + "thumb/" + data.file}
                  width={100}
                  height={100}
                />
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
      <footer className="footer">
        <a
          href="https://github.com/Nyamadamadamada/React_Transitions_API"
          target="_blank"
          rel="noopener noreferrer"
        >
          See source code
        </a>
      </footer>
    </div>
  );
}

export default App;
