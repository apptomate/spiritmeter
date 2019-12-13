import React, { PureComponent } from "react";
import { Row, Col, Rate } from "antd";
import { GOOGLE_MAPS_API_KEY } from "../../../Redux/_helpers/Constants";
import Axios from "axios";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

class NearByListCard extends PureComponent {
  render() {
    const {
      data: {
        name,
        rating = 0,
        user_ratings_total,
        vicinity,
        opening_hours,
        place_id
      }
    } = this.props;
    getRefFromPlaceId(place_id);
    return (
      <div>
        <Row className="map-datails">
          <Col>
            <div className="left">
              <h4>{name}</h4>
              <span>
                <span className="pr-0-5">{rating}</span>
                <Rate
                  tooltips={desc}
                  disabled
                  defaultValue={parseInt(rating.toFixed(0))}
                />
                <span className="ant-rate-text">
                  {user_ratings_total} Ratings
                </span>
              </span>
              <p>{vicinity}</p>
              <p>
                {opening_hours && opening_hours.open_now
                  ? "Open Now"
                  : "Closed"}
              </p>
            </div>
            <div className="right">
              <div className="fixed-img">
                {/* <img src={getImgFromRef(place_id)} alt={name} /> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NearByListCard;

export function getImgFromRef(photos) {
  const imgRef = (photos[0] || {}).photo_reference;
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imgRef}&key=${GOOGLE_MAPS_API_KEY}`;
}

export async function getRefFromPlaceId(placeId) {
  let response = await Axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${GOOGLE_MAPS_API_KEY}`
  );
  console.log(response);
}
