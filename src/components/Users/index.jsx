import React, { Component, Fragment } from "react";
import { getAllListUsers } from "../../Redux/_actions";
import { connect } from "react-redux";
import {
  Icon,
  Spin,
  PageHeader,
  Table,
  Input,
  Button,
  Divider,
  Tag
} from "antd";
import Highlighter from "react-highlight-words";
import DisplayAvatar from "../Common/DisplayAvatar";
import { Link } from "react-router-dom";

const { Column } = Table;

const columns = [
  {
    title: "Profile",
    dataIndex: "profileImage",
    key: "profileImage",
    render: profileImage => (
      <span>
        <DisplayAvatar srcPath={profileImage} />
      </span>
    )
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender"
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber"
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: role => (
      <span>
        <Tag color={role === "Admin" ? "volcano" : "geekblue"}>{role}</Tag>
      </span>
    )
  },
  {
    title: "Action",
    dataIndex: "userId",
    key: "userId",
    render: userId => (
      <span>
        <Link to={`/admin/viewUser/${userId}`}>
          <Button
            type="primary"
            shape="circle"
            icon="eye"
            size="small"
            title="View"
          />
        </Link>
        <Divider type="vertical" />
        <Button
          type="danger"
          shape="circle"
          icon="delete"
          size="small"
          title="Delete"
        />
      </span>
    )
  }
];

class Users extends Component {
  componentDidMount() {
    this.props.getAllListUsers();
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const {
      UsersResponse: { data = [], loading }
    } = this.props;

    return (
      <Fragment>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Users"
        />
        <div>
          <Spin spinning={loading}>
            <br />
            <Table columns={columns} dataSource={data}>
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <a>Invite {record.lastName}</a>
                    <Divider type="vertical" />
                    <a>Delete</a>
                  </span>
                )}
              />
            </Table>
          </Spin>
        </div>
      </Fragment>
    );
  }
}
const getState = state => {
  return {
    UsersResponse: state.getAllListUsers
  };
};
export default connect(getState, {
  getAllListUsers
})(Users);
