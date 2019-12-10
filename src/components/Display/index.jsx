import React, { Component, Fragment } from "react";
import { List, Avatar, Icon, Spin, Card, Button } from "antd";
import { getAllListDisplay } from "../../Redux/_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DisplayImage from "../Common/DisplayImage";

class Display extends Component {
  componentDidMount() {
    this.props.getAllListDisplay();
  }
  render() {
    const {
      DisplayResponseData: { data = [], loading }
    } = this.props;

    const listElements = data.map((element, key) => {
      let {
        name,
        categoryName,
        type,
        country,
        state,
        cityName,
        address,
        isPrivate,
        createdByName,
        displayId
      } = element;
      let filePathJson = element.filePath || "[]";
      let filePathParsed = JSON.parse(filePathJson);
      filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
      return (
        <div className='list-card' key={key}>
          <div className='list-img'>
            <DisplayImage srcPath={filePathParsed} />
          </div>
          <div className='listing-contant'>
            <h4 className='list-name'>{name}</h4>
            <div className='list-name-imp'>
              <Icon type='home' /> {categoryName}
            </div>
            <div className='list-name-imp'>
              <Icon type='radar-chart' /> {type}
            </div>

            <div className='list-name-imp'>
              <Icon type='environment' /> {country}
              {state && ` , ${state}`}
              {cityName && ` , ${cityName}`}
              {address && ` , ${address}`}
            </div>

            <div className='list-name-imp'>
              {isPrivate === "Is Private" ? (
                <Fragment>
                  <i className='fas fa-user-lock color-g' /> Is Private{" "}
                </Fragment>
              ) : (
                <Fragment>
                  <i className='fas fa-globe-asia color-r' />
                  Is Public{" "}
                </Fragment>
              )}
            </div>

            <div className='item-center list-username mt-2'>
              <Avatar icon='user' />
              <span>{createdByName}</span>
              <Link to={"/admin/viewDisplay/" + displayId}>
                <button className='cus-btn ml-a'>
                  <span className='circle'>
                    <span className='icon arrow'></span>
                  </span>
                  <span className='button-text'>View</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });

    // let dataToDisplay = [];
    // data.forEach((element, key) => {
    //   let filePathJson = element.filePath || "[]";
    //   let filePathParsed = JSON.parse(filePathJson);
    //   filePathParsed = filePathParsed.length ? filePathParsed[0].filePath : "";
    //   dataToDisplay.push({
    //     //href: "#",
    //     title: element.name,
    //     filePath: filePathParsed,
    //     content: (
    //       <div className='list-display' key={`list_${key}`}>
    //         <span>
    //           <Icon type='home' theme='filled' /> {element.categoryName}
    //         </span>
    //         <span>
    //           <i className='fas fa-hand-holding-heart color-o'></i>{" "}
    //           {element.type}{" "}
    //         </span>
    //         <span className='color-g'>
    //           {element.isPrivate ? "Is Private" : "Public"}
    //         </span>
    //         <p>
    //           <Icon type='environment' /> {element.country} , {element.state} ,{" "}
    //           {element.cityName} , {element.address}
    //         </p>
    //         <div className='item-center list-username'>
    //           <Avatar icon='user' />
    //           <span>{element.createdByName}</span>
    //           <span>
    //             <Link to={"/admin/viewDisplay/" + element.displayId}>View</Link>
    //           </span>
    //         </div>
    //       </div>
    //     )
    //   });
    // });

    return (
      <Fragment>
        <div className='title-card'>
          <h4>List of Display</h4>
        </div>
        <br />
        <Spin spinning={loading}>{listElements}</Spin>
      </Fragment>

      // <Spin spinning={loading}>
      //   <List
      //     itemLayout='vertical'
      //     size='large'
      //     pagination={{
      //       onChange: page => {
      //         console.log(page);
      //       },
      //       pageSize: 5
      //     }}
      //     dataSource={dataToDisplay}
      //     renderItem={item => (
      //       <List.Item
      //         key={item.title}
      //         extra={<img width={272} alt='logo' src={item.filePath} />}
      //       >
      //         <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
      //         {item.content}
      //       </List.Item>
      //     )}
      //   />
      // </Spin>
    );
  }
}

const getState = state => {
  return {
    DisplayResponseData: state.getAllListDisplay
  };
};

export default connect(getState, {
  getAllListDisplay
})(Display);
