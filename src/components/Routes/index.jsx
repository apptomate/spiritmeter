import React, { Component, Fragment } from "react";
import { Spin, PageHeader, Input } from "antd";
import { getAllListRoutes } from "../../Redux/_actions";
import { connect } from "react-redux";
import RouteCard from "../Common/RouteCard";
class Routes extends Component {
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
    this.props.getAllListRoutes();
  }
  render() {
    let {
      RoutesResponseData: { data = [], loading }
    } = this.props;
    const { Search } = Input;
    const { searchQuery } = this.state;

    if (searchQuery) {
      data = data.filter(list => {
        const { routeName, designatedCharityName, comments } = list;
        const query = routeName + designatedCharityName + comments;
        return query.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    return (
      <Fragment>
        <div className="dis-center">
          <PageHeader className="title-header-left" title="List of Routes" />
          <div className="title-header-right">
            <Search
              className="f-r"
              placeholder="Search..."
              style={{ width: 200 }}
              onSearch={this.filterRecord}
            />
          </div>
        </div>

        <Spin spinning={loading}>
          {data.map((list, key) => (
            <RouteCard key={key} data={list} />
          ))}
        </Spin>
      </Fragment>
    );
  }
}
const getState = state => {
  return {
    RoutesResponseData: state.getAllListRoutes
  };
};
export default connect(getState, {
  getAllListRoutes
})(Routes);
