import React from "react";
import { useEffect, useState } from "react";
import Histogram from "./Histogram";
import "./button.css";

const Button = () => {
  const [data, setdata] = useState();
  const chars = {};
  const topWords = [];
  let histogramData = [];
  let wor = [];
  let cnt = [];
  let [word, setWord] = useState([]);
  let [count, setCount] = useState([]);

  function Contents() {
    fetch("https://www.terriblytinytales.com/test.txt")
      .then((response) => response.text())
      .then((data) => setdata(data));
  }

  useEffect(() => {
    if (data === undefined) {
    } else {
      cal();
    }
  }, [data]);

  useEffect(() => {
    console.log(count, word);
  }, [count, word]);

  function cal() {
    const arr = data.split(" ");

    for (let word of arr) {
      if (!chars[word]) {
        chars[word] = 1;
      } else {
        chars[word]++;
      }
    }

    let test = Object.values(chars);

    test.sort(function (a, b) {
      return a - b;
    });

    test.reverse();

    let top = test.slice(0, 20);
    let temp = top;

    top = top.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });

    for (let i = 0; i < top.length; i++) {
      topWords.push(
        Object.keys(chars).filter((key) => {
          return chars[key] === top[i];
        })
      );
    }

    for (let i = 0; i < topWords.length; i++) {
      for (let j = 0; j < topWords[i].length; j++) {
        histogramData.push({ word: topWords[i][j], count: temp[i] });
      }
    }

    histogramData = histogramData.slice(0, 20);
    console.log(histogramData);

    for (let i = 0; i < histogramData.length; i++) {
      wor.push(histogramData[i].word);
      cnt.push(histogramData[i].count);
    }
    setWord(wor);
    setCount(cnt);
    console.log(word, count);
  }

  return (
    <div className="page">
      <button className="btn" type="button" onClick={Contents}>
        Discover
      </button>
      {count.length > 1 && word.length > 1 && (
        <Histogram words={word} counts={count} />
      )}
    </div>
  );
};

export default Button;
