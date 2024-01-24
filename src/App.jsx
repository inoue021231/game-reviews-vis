import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import WordCloud from "react-d3-cloud";
import { useState, useEffect } from "react";

import "./../index.css";
import Header from "./components/Header";
import Icon from "./components/Icon";
import FetchData from "./components/FetchData";
import NodeLink from "./components/NodeLink";

const App = () => {
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState([]);
  const [selectGameIdx, setSelectGameIdx] = useState(0);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    height: "100%",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const fontSizeMapper = (word) => Math.pow(word.value, 0.5) * 1.5;

  const getColor = (value) => {
    const blueflag = value > 0.5;
    const color = blueflag ? 240 : 0;
    const lightness = 50 + (blueflag ? Math.abs(value - 1) : value) * 100;
    return `hsl(${color}, 100%, ${lightness}%)`;
  };

  useEffect(() => {
    FetchData({ setData, addData });
  }, []);

  useEffect(() => {
    FetchData({ setData, addData, setSelectGameIdx });
  }, [addData]);

  console.log(data);

  return (
    <div>
      <Header
        setAddData={setAddData}
        setSelectGameIdx={setSelectGameIdx}
      ></Header>
      <Grid container style={{ height: "calc(100vh - 90px)" }} spacing={0}>
        <Grid item xs={8}>
          <Item square>
            {data.length !== 0 ? (
              <NodeLink data={data} setSelectGameIdx={setSelectGameIdx} />
            ) : (
              <h2>Loading...</h2>
            )}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item square>
            <div style={{ backgroundColor: "lightgray", padding: "10px" }}>
              {data.length !== 0 ? (
                <div>
                  <Grid container spacing={0} justifyContent="flex-end">
                    <Grid item alignItems="center">
                      低評価
                    </Grid>
                    <Grid item>
                      <Box
                        width="150px"
                        height="20px"
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, red 0%, white 50%, blue 100%)",
                        }}
                      />
                    </Grid>
                    <Grid item alignItems="stretch">
                      高評価
                    </Grid>
                  </Grid>
                  <WordCloud
                    data={data[selectGameIdx].wordcloud}
                    fontSize={fontSizeMapper}
                    width={100}
                    height={100}
                    rotate={0}
                    padding={0}
                    onWordClick={(event, d) => console.log(d.text)}
                    fill={(word) => getColor(word.rating)}
                  ></WordCloud>

                  <div style={{ fontSize: "30px" }}>
                    {data[selectGameIdx].name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    {data[selectGameIdx].genres.map((genre, index) => (
                      <div key={index} style={{ marginRight: "10px" }}>
                        {genre.description}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
