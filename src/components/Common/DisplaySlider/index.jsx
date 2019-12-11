import React from "react";
import { Carousel } from "antd";
import DefaultPlace from "../../../assets/img/defaultPlace.png";
export default function DisplaySlider(props) {
  const { srcPaths } = props;
  return (
    <Carousel autoplay>
      {srcPaths.map((list, key) => (
        <div key={key}>
          <img
            alt='no data'
            src={list.FilePath || DefaultPlace}
            className='w-100'
          />
        </div>
      ))}
    </Carousel>
  );
}
