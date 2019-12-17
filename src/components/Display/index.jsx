import React, { Component, Fragment } from "react";
import { Spin, PageHeader, Input, Empty } from "antd";
import { getAllListDisplay } from "../../Redux/_actions";
import { connect } from "react-redux";
import DisplayCard from "./DisplayCard";

class Display extends Component {
  state = { searchQuery: "" };
  constructor(props) {
    super(props);
    this.filterRecord = this.filterRecord.bind(this);
  }
  //Search
  filterRecord = (value = "") => {
    this.setState({ searchQuery: value.trim() });
  };
  componentDidMount() {
    this.props.getAllListDisplay();
  }
  render() {
    let {
      DisplayResponseData: { data = [], loading }
    } = this.props;
    const { Search } = Input;
    const { searchQuery } = this.state;

    if (searchQuery) {
      data = data.filter(list => {
        const { name, country, state, cityName, address, createdByName } = list;
        const query =
          name + country + state + cityName + address + createdByName;
        return query.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    const recordLength = data.length;

    return (
      <Fragment>
        <div className="dis-center">
          <PageHeader className="title-header-left" title="List of Display" />
          <div className="title-header-right">
            <Search
              onSearch={this.filterRecord}
              className="f-r"
              placeholder="Search..."
              style={{ width: 200 }}
            />
          </div>
        </div>

        <Spin spinning={loading}>
          {!recordLength ? (
            <Empty />
          ) : (
            <Fragment>
              {data.map((list, key) => (
                <DisplayCard listData={list} hideViewButton={false} key={key} />
              ))}
            </Fragment>
          )}
        </Spin>
      </Fragment>
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
